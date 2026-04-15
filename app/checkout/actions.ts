'use server';

import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';

export type PaymentMethod = 'cod' | 'card' | 'gpay' | 'stripe';

export type OrderFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
};

export type PlaceOrderResult =
  | { success: true; orderId: string; total: number }
  | { success: false; error: string };

/** Fully mock order placement — generates a realistic order ID and clears the cart. */
export async function placeOrder(formData: OrderFormData): Promise<PlaceOrderResult> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    if (!cartId) {
      return { success: false, error: 'No cart found. Please add items to your cart first.' };
    }

    // Fetch cart to compute total (for receipt display)
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

    // Clear cart from DB atomically (delete items first, then cart)
    if (cartId) {
      try {
        await supabase.from('cart_items').delete().eq('cart_id', cartId);
        await supabase.from('carts').delete().eq('id', cartId);
      } catch (dbError) {
        console.error('Error clearing cart from database:', dbError);
        // Continue anyway - we'll clear the cookie
      }
    }

    // Delete cart cookie to clear the cart UI
    (await cookies()).delete('cartId');
    revalidateTag(TAGS.cart);

    // Generate a realistic mock order ID
    const prefix = 'TWS';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderId = `${prefix}-${timestamp}-${random}`;

    return { success: true, orderId, total };
  } catch (error) {
    console.error('Error placing order:', error);
    // Return error instead of masking it
    return { success: false, error: 'Failed to place order. Please try again.' };
  }
}

export async function getCheckoutCart() {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    if (!cartId) return null;

    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cartId);
    if (!isValidUUID) return null;

    const { data: cartData, error } = await supabase
      .from('carts')
      .select(`
        id,
        cart_items (
          id,
          quantity,
          variant_id,
          variants (
            id,
            title,
            price,
            product_id,
            products (
              id,
              title,
              handle,
              product_images (
                image_url,
                alt_text
              )
            )
          )
        )
      `)
      .eq('id', cartId)
      .single();

    if (error || !cartData) return null;

    const items = (cartData.cart_items as any[]).map((item: any) => {
      const variant = item.variants;
      const product = variant?.products;
      const firstImage = product?.product_images?.[0];

      return {
        id: item.id,
        quantity: item.quantity,
        variantTitle: variant?.title || '',
        price: parseFloat(variant?.price || '0'),
        total: parseFloat(variant?.price || '0') * item.quantity,
        productTitle: product?.title || '',
        productHandle: product?.handle || '',
        imageUrl: firstImage?.image_url || '',
        imageAlt: firstImage?.alt_text || product?.title || '',
      };
    });

    const subtotal = items.reduce((sum, i) => sum + i.total, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal >= 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    return { items, subtotal, tax, shipping, total };
  } catch {
    return null;
  }
}
