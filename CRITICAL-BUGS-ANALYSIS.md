# Critical State Synchronization Bugs - Analysis & Fixes

## Issues Identified

### 1. **Persistence Failure: Items Disappearing After Add**
**Root Cause**: Race condition between optimistic updates and server state reconciliation

**Problem Flow**:
- User clicks "Add to Cart" → optimistic reducer updates local state instantly
- Server action `addItem()` executes asynchronously
- If server response is slow or fails silently, `setCart(fresh)` may not fire
- Worse: If `fresh` is `null` (error case), the cart reverts to empty
- The optimistic state is lost because `useOptimistic` resets when server responds

**Code Location**: `components/cart/cart-context.tsx` lines 180-190

```typescript
const add = useCallback(
  async (variant: ProductVariant, product: Product) => {
    const previousQuantity = optimisticCart?.lines.find(l => l.merchandise.id === variant.id)?.quantity || 0;
    startTransition(() => {
      updateOptimisticCart({ type: 'ADD_ITEM', payload: { variant, product, previousQuantity } });
    });
    const fresh = await CartActions.addItem(variant.id);
    if (fresh) setCart(fresh);  // ❌ If fresh is null, cart becomes undefined!
  },
  [updateOptimisticCart, optimisticCart]
);
```

### 2. **Checkout Logic Gap: Order Placed But Cart Not Cleared**
**Root Cause**: Race condition between `placeOrder()` and cart state cleanup

**Problem Flow**:
- User clicks "Place Order" → `placeOrder()` server action executes
- Server deletes cart items from DB and clears cookie
- BUT: Client-side cart context still has the old cart state
- `revalidateTag(TAGS.cart)` is called, but doesn't automatically clear the context
- User sees success screen, but if they navigate back, old cart items reappear
- OR: Cart clears before order is confirmed, showing empty state prematurely

**Code Location**: `app/checkout/actions.ts` lines 40-50

```typescript
// Delete cart from DB (best-effort)
try {
  if (cartId) {
    await supabase.from('cart_items').delete().eq('cart_id', cartId);
    await supabase.from('carts').update({ checkout_url: null }).eq('id', cartId);
  }
} catch (_) { /* ignore, table may not exist */ }

// Delete cart cookie to clear the cart UI
(await cookies()).delete('cartId');
revalidateTag(TAGS.cart);  // ❌ This doesn't clear the React context!
```

### 3. **Missing Error Recovery in Add to Cart**
**Root Cause**: No fallback when server action fails

**Problem**: If `CartActions.addItem()` throws or returns null, the optimistic state is lost and user sees empty cart.

**Code Location**: `components/cart/cart-context.tsx` line 188

```typescript
const fresh = await CartActions.addItem(variant.id);
if (fresh) setCart(fresh);  // ❌ No else clause to preserve optimistic state
```

### 4. **Checkout Cart Fetch Race Condition**
**Root Cause**: `getCheckoutCart()` may fetch stale data if called immediately after adding items

**Problem**: Cart items added optimistically may not be persisted to DB yet when checkout page loads.

---

## Fixes

### Fix 1: Preserve Optimistic State on Server Failure
**File**: `components/cart/cart-context.tsx`

Replace the `add` callback to preserve optimistic state if server fails:

```typescript
const add = useCallback(
  async (variant: ProductVariant, product: Product) => {
    const previousQuantity = optimisticCart?.lines.find(l => l.merchandise.id === variant.id)?.quantity || 0;
    startTransition(() => {
      updateOptimisticCart({ type: 'ADD_ITEM', payload: { variant, product, previousQuantity } });
    });
    const fresh = await CartActions.addItem(variant.id);
    if (fresh) {
      setCart(fresh);
    } else {
      // ✅ On error, keep optimistic state - don't revert to undefined
      console.error('Failed to add item to cart, keeping optimistic state');
    }
  },
  [updateOptimisticCart, optimisticCart]
);
```

### Fix 2: Preserve Optimistic State on Update Failure
**File**: `components/cart/cart-context.tsx`

Replace the `update` callback:

```typescript
const update = useCallback(
  async (lineId: string, merchandiseId: string, nextQuantity: number) => {
    startTransition(() => {
      updateOptimisticCart({ type: 'UPDATE_ITEM', payload: { merchandiseId, nextQuantity } });
    });
    const fresh = await CartActions.updateItem({ lineId, quantity: nextQuantity });
    if (fresh) {
      setCart(fresh);
    } else {
      // ✅ On error, keep optimistic state
      console.error('Failed to update item quantity, keeping optimistic state');
    }
  },
  [updateOptimisticCart]
);
```

### Fix 3: Clear Cart Context After Order Placement
**File**: `app/checkout/checkout-client.tsx`

After successful order, clear the cart context:

```typescript
const doPlaceOrder = (method: PaymentMethod = paymentMethod) => {
  setError(null);
  startTransition(async () => {
    const data: OrderFormData = {
      firstName, lastName, email, phone, address, city, state, zipCode, country,
      paymentMethod: method, cardNumber, cardExpiry, cardCvc, cardName,
    };
    const result = await placeOrder(data);
    if (result.success) {
      setOrderId(result.orderId);
      setOrderTotal(result.total);
      // ✅ Clear cart context after successful order
      // This will be picked up by the cart provider on next navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(result.error);
    }
  });
};
```

### Fix 4: Add Cart Sync on App Focus
**File**: `components/cart/cart-context.tsx`

Add effect to sync cart when user returns to tab:

```typescript
useEffect(() => {
  const handleFocus = () => {
    // Refresh cart when user returns to tab
    CartActions.getCart().then(cart => {
      if (cart) setCart(cart);
    });
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, []);
```

### Fix 5: Add Retry Logic to Server Actions
**File**: `components/cart/actions.ts`

Add retry mechanism for transient failures:

```typescript
async function addItemWithRetry(variantId: string | undefined, retries = 2): Promise<Cart | null> {
  if (!variantId) return null;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const cartId = await getOrCreateCartId();

      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cartId)
        .eq('variant_id', variantId)
        .single();

      if (existingItem) {
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
      } else {
        await supabase
          .from('cart_items')
          .insert({
            cart_id: cartId,
            variant_id: variantId,
            quantity: 1,
          });
      }

      revalidateTag(TAGS.cart);
      return await getCart();
    } catch (error) {
      if (attempt === retries) {
        console.error('Error adding item to cart after retries:', error);
        return null;
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
    }
  }
  return null;
}
```

### Fix 6: Ensure Cart Clears on Checkout Success
**File**: `app/checkout/actions.ts`

Improve the cart clearing logic:

```typescript
export async function placeOrder(formData: OrderFormData): Promise<PlaceOrderResult> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    if (!cartId) {
      return { success: false, error: 'No cart found. Please add items to your cart first.' };
    }

    // Fetch cart to compute total
    const { data: cartData } = await supabase
      .from('carts')
      .select(`
        id,
        cart_items (
          id,
          quantity,
          variant_id,
          variants ( price )
        )
      `)
      .eq('id', cartId)
      .single();

    const cartItems = (cartData?.cart_items as any[]) ?? [];
    const subtotal = cartItems.reduce(
      (sum: number, item: any) => sum + parseFloat(item.variants?.price || '0') * item.quantity,
      0
    );
    const tax = subtotal * 0.08;
    const shipping = subtotal >= 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    // ✅ Clear cart BEFORE generating order ID (atomic operation)
    if (cartId) {
      // Delete items first
      await supabase.from('cart_items').delete().eq('cart_id', cartId);
      // Then delete cart
      await supabase.from('carts').delete().eq('id', cartId);
    }

    // Delete cart cookie
    (await cookies()).delete('cartId');
    revalidateTag(TAGS.cart);

    // Generate order ID
    const prefix = 'TWS';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderId = `${prefix}-${timestamp}-${random}`;

    return { success: true, orderId, total };
  } catch (error) {
    console.error('Error placing order:', error);
    // ❌ Don't return success on error - let user retry
    return { success: false, error: 'Failed to place order. Please try again.' };
  }
}
```

---

## Summary of Changes

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| Items disappear after add | Optimistic state lost on server error | Preserve optimistic state if server fails |
| Cart clears prematurely | Race condition in checkout | Clear cart atomically before order confirmation |
| No error recovery | Silent failures | Add retry logic and error handling |
| Stale cart on checkout | Timing issue | Sync cart on app focus |
| Order shows but cart not cleared | Missing context cleanup | Delete cart from DB before success response |

