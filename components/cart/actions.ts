'use server';

import { TAGS } from '@/lib/constants';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import type { Cart, CartItem, ShopifyCart, ShopifyCartLine } from '@/lib/shopify/types';
import { supabase } from '@/lib/supabase';

// Local adapter utilities to return FE Cart (avoid cyclic deps)
function adaptCartLine(shopifyLine: ShopifyCartLine): CartItem {
  const merchandise = shopifyLine.merchandise;
  const product = merchandise.product;

  return {
    id: shopifyLine.id,
    quantity: shopifyLine.quantity,
    cost: {
      totalAmount: {
        amount: (parseFloat(merchandise.price.amount) * shopifyLine.quantity).toString(),
        currencyCode: merchandise.price.currencyCode,
      },
    },
    merchandise: {
      id: merchandise.id,
      title: merchandise.title,
      selectedOptions: merchandise.selectedOptions || [],
      product: {
        id: product.title,
        title: product.title,
        handle: product.handle,
        categoryId: undefined,
        description: '',
        descriptionHtml: '',
        featuredImage: product.images?.edges?.[0]?.node
          ? {
              ...product.images.edges[0].node,
              altText: product.images.edges[0].node.altText || product.title,
              height: 600,
              width: 600,
              thumbhash: product.images.edges[0].node.thumbhash || undefined,
            }
          : { url: '', altText: '', height: 0, width: 0 },
        currencyCode: merchandise.price.currencyCode,
        priceRange: {
          minVariantPrice: merchandise.price,
          maxVariantPrice: merchandise.price,
        },
        compareAtPrice: undefined,
        seo: { title: product.title, description: '' },
        options: [],
        tags: [],
        variants: [],
        images:
          product.images?.edges?.map((edge: any) => ({
            ...edge.node,
            altText: edge.node.altText || product.title,
            height: 600,
            width: 600,
          })) || [],
        availableForSale: true,
      },
    },
  } satisfies CartItem;
}

function adaptCart(shopifyCart: ShopifyCart | null): Cart | null {
  if (!shopifyCart) return null;

  const lines = shopifyCart.lines?.edges?.map((edge: any) => adaptCartLine(edge.node)) || [];

  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    cost: {
      subtotalAmount: shopifyCart.cost.subtotalAmount,
      totalAmount: shopifyCart.cost.totalAmount,
      totalTaxAmount: shopifyCart.cost.totalTaxAmount,
    },
    totalQuantity: lines.reduce((sum: number, line: CartItem) => sum + line.quantity, 0),
    lines,
  } satisfies Cart;
}

async function getOrCreateCartId(): Promise<string> {
  let cartId = (await cookies()).get('cartId')?.value;
  
  // Validate that cartId is a valid UUID format
  const isValidUUID = cartId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cartId);
  
  if (!cartId || !isValidUUID) {
    // Create a new cart in the database
    const { data, error } = await supabase
      .from('carts')
      .insert({})
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error creating cart:', error);
      // Fallback: generate a UUID-like ID
      cartId = crypto.randomUUID();
    } else {
      cartId = data.id;
    }

    (await cookies()).set('cartId', cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return cartId;
}

// Add item server action
export async function addItem(variantId: string | undefined): Promise<Cart | null> {
  if (!variantId) return null;
  
  try {
    const cartId = await getOrCreateCartId();

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('variant_id', variantId)
      .single();

    if (existingItem) {
      // Update quantity
      await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('id', existingItem.id);
    } else {
      // Insert new item
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
    console.error('Error adding item to cart:', error);
    return null;
  }
}

// Update item server action (quantity 0 removes)
export async function updateItem({ lineId, quantity }: { lineId: string; quantity: number }): Promise<Cart | null> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    if (!cartId) return null;

    if (quantity === 0) {
      // Remove item
      await supabase
        .from('cart_items')
        .delete()
        .eq('id', lineId);
    } else {
      // Update quantity
      await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', lineId);
    }

    revalidateTag(TAGS.cart);
    return await getCart();
  } catch (error) {
    console.error('Error updating item:', error);
    return null;
  }
}

export async function createCartAndSetCookie() {
  try {
    const { data, error } = await supabase
      .from('carts')
      .insert({})
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error creating cart:', error);
      return null;
    }

    (await cookies()).set('cartId', data.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return { id: data.id };
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
}

export async function getCart(): Promise<Cart | null> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;

    if (!cartId) {
      return null;
    }

    // Validate UUID format
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cartId);
    if (!isValidUUID) {
      console.error('Invalid cart ID format:', cartId);
      // Clear invalid cookie
      (await cookies()).delete('cartId');
      return null;
    }

    // Fetch cart with items, variants, and products
    const { data: cartData, error: cartError } = await supabase
      .from('carts')
      .select(`
        id,
        checkout_url,
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

    if (cartError || !cartData) {
      console.error('Error fetching cart:', cartError);
      return null;
    }

    // Transform to Cart format
    const lines: CartItem[] = (cartData.cart_items || []).map((item: any) => {
      const variant = item.variants;
      const product = variant?.products;
      const firstImage = product?.product_images?.[0];

      return {
        id: item.id,
        quantity: item.quantity,
        cost: {
          totalAmount: {
            amount: (parseFloat(variant?.price || '0') * item.quantity).toString(),
            currencyCode: 'USD',
          },
        },
        merchandise: {
          id: variant?.id || '',
          title: variant?.title || '',
          selectedOptions: [],
          product: {
            id: product?.id || '',
            title: product?.title || '',
            handle: product?.handle || '',
            categoryId: undefined,
            description: '',
            descriptionHtml: '',
            featuredImage: firstImage
              ? {
                  url: firstImage.image_url,
                  altText: firstImage.alt_text || product?.title || '',
                  height: 600,
                  width: 600,
                }
              : { url: '', altText: '', height: 0, width: 0 },
            currencyCode: 'USD',
            priceRange: {
              minVariantPrice: {
                amount: variant?.price?.toString() || '0',
                currencyCode: 'USD',
              },
              maxVariantPrice: {
                amount: variant?.price?.toString() || '0',
                currencyCode: 'USD',
              },
            },
            compareAtPrice: undefined,
            seo: { title: product?.title || '', description: '' },
            options: [],
            tags: [],
            variants: [],
            images: [],
            availableForSale: true,
          },
        },
      };
    });

    const subtotal = lines.reduce((sum, line) => sum + parseFloat(line.cost.totalAmount.amount), 0);

    return {
      id: cartData.id,
      checkoutUrl: cartData.checkout_url || '/checkout',
      cost: {
        subtotalAmount: {
          amount: subtotal.toString(),
          currencyCode: 'USD',
        },
        totalAmount: {
          amount: subtotal.toString(),
          currencyCode: 'USD',
        },
        totalTaxAmount: {
          amount: '0',
          currencyCode: 'USD',
        },
      },
      totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
      lines,
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

