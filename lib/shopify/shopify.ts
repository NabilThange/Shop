import { ProductCollectionSortKey, ProductSortKey, ShopifyCart, ShopifyCollection, ShopifyProduct } from './types';
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_KEY } from './constants';
import { supabase } from '../supabase';

// Transform database product to ShopifyProduct format with edges structure
function transformProductFromDb(dbProduct: any): ShopifyProduct {
  const images = dbProduct.product_images || [];
  const variants = dbProduct.variants || [];
  
  // If no images in product_images table, use featured image from products table
  const imageEdges = images.length > 0 
    ? images.map((img: any) => ({
        node: {
          url: img.image_url,
          altText: img.alt_text || '',
          thumbhash: img.thumbhash,
        }
      }))
    : dbProduct.featured_image_url 
      ? [{
          node: {
            url: dbProduct.featured_image_url,
            altText: dbProduct.featured_image_alt_text || dbProduct.title || '',
            thumbhash: dbProduct.featured_image_thumbhash,
          }
        }]
      : [];
  
  return {
    id: dbProduct.id,
    title: dbProduct.title,
    description: dbProduct.description,
    descriptionHtml: dbProduct.description_html || dbProduct.description,
    handle: dbProduct.handle,
    productType: dbProduct.product_type || '',
    images: {
      edges: imageEdges
    },
    priceRange: {
      minVariantPrice: {
        amount: dbProduct.min_price?.toString() || '0',
        currencyCode: 'USD',
      },
    },
    compareAtPriceRange: {
      minVariantPrice: {
        amount: dbProduct.compare_at_price?.toString() || '0',
        currencyCode: 'USD',
      },
    },
    variants: {
      edges: variants.map((variant: any) => ({
        node: {
          id: variant.id,
          title: variant.title,
          price: {
            amount: variant.price?.toString() || '0',
            currencyCode: 'USD',
          },
          availableForSale: variant.available_for_sale ?? true,
          selectedOptions: [],
        }
      }))
    },
  };
}

// Get all products
export async function getProducts({
  first = DEFAULT_PAGE_SIZE,
  sortKey = DEFAULT_SORT_KEY,
  reverse = false,
  query: searchQuery,
}: {
  first?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<ShopifyProduct[]> {
  try {
    let query_builder = supabase
      .from('products')
      .select(`
        *,
        product_images(id, image_url, alt_text, thumbhash, display_order),
        variants(id, title, price, available_for_sale)
      `)
      .limit(first || DEFAULT_PAGE_SIZE);

    if (searchQuery) {
      query_builder = query_builder.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query_builder;

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return [];
    }

    return (data || []).map(transformProductFromDb);
  } catch (err) {
    console.error('Error in getProducts:', err);
    return [];
  }
}

// Get single product by handle
export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(id, image_url, alt_text, thumbhash, display_order),
        variants(id, title, price, available_for_sale)
      `)
      .eq('handle', handle)
      .single();

    if (error || !data) {
      console.error('Error fetching product:', error);
      return null;
    }

    return transformProductFromDb(data);
  } catch (err) {
    console.error('Error in getProduct:', err);
    return null;
  }
}

// Get collections
export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('id, title, handle, description, image_url, image_alt_text')
      .limit(first);

    if (error || !data) {
      console.error('Error fetching collections:', error);
      return [];
    }

    return data.map((col: any) => ({
      id: col.id,
      title: col.title,
      handle: col.handle,
      description: col.description,
      image: col.image_url ? {
        url: col.image_url,
        altText: col.image_alt_text || col.title,
        thumbhash: '',
      } : {
        url: '',
        altText: '',
        thumbhash: '',
      },
    }));
  } catch (err) {
    console.error('Error in getCollections:', err);
    return [];
  }
}

// Get products from a specific collection
export async function getCollectionProducts({
  collection,
  limit = DEFAULT_PAGE_SIZE,
  sortKey = DEFAULT_SORT_KEY,
  query: searchQuery,
  reverse = false,
}: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  query?: string;
  reverse?: boolean;
}): Promise<ShopifyProduct[]> {
  try {
    // First, get the collection UUID from the handle
    const { data: collectionData, error: collectionError } = await supabase
      .from('collections')
      .select('id')
      .eq('handle', collection)
      .single();

    if (collectionError || !collectionData) {
      console.error('Error fetching collection:', collectionError);
      return [];
    }

    let query_builder = supabase
      .from('products')
      .select(`
        *,
        product_images(id, image_url, alt_text, thumbhash, display_order),
        variants(id, title, price, available_for_sale)
      `)
      .eq('collection_id', collectionData.id)
      .limit(limit || DEFAULT_PAGE_SIZE);

    if (searchQuery) {
      query_builder = query_builder.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query_builder;

    if (error) {
      console.error('Error fetching collection products:', error);
      return [];
    }

    return (data || []).map(transformProductFromDb);
  } catch (err) {
    console.error('Error in getCollectionProducts:', err);
    return [];
  }
}

