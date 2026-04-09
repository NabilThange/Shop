# Supabase Database Setup Guide

This project uses Supabase PostgreSQL for storing ecommerce data.

## Database Tables

The schema includes the following tables:

- **collections** - Product categories (Lamps, Seats, Rugs, Pillows, Miscellaneous)
- **products** - Product information with pricing and descriptions
- **product_images** - Product image gallery with ordering
- **product_options** - Product attributes (e.g., Size, Color)
- **product_option_values** - Values for each option
- **product_variants** - Specific product variants with pricing
- **cart_items** - Shopping cart items (if using server-side cart)

## Running the Setup

### Option 1: Via Supabase Dashboard (Recommended)

1. Go to your [Supabase Project](https://supabase.com/dashboard)
2. Navigate to **SQL Editor** section
3. Click **New Query**
4. Copy the entire contents of `scripts/01-schema.sql`
5. Paste it into the editor and click **Run**
6. Create another new query
7. Copy the contents of `scripts/02-seed.sql`
8. Paste it and click **Run**

### Option 2: Via psql Command Line

```bash
# Set your Supabase connection details
export PGPASSWORD="your-supabase-password"
psql -h db.xxxxx.supabase.co -U postgres -d postgres -f scripts/01-schema.sql
psql -h db.xxxxx.supabase.co -U postgres -d postgres -f scripts/02-seed.sql
```

## Schema Overview

### Collections Table
Stores product categories with metadata.

```sql
id (UUID)
title (TEXT) - Unique category name
handle (TEXT) - URL-friendly identifier
description (TEXT) - Category description
image_url (TEXT) - Collection image
image_alt_text (TEXT) - Accessibility alt text
created_at / updated_at (TIMESTAMPS)
```

### Products Table
Core product information with pricing.

```sql
id (UUID)
collection_id (UUID) - Links to collections table
title (TEXT) - Product name
handle (TEXT) - URL-friendly identifier
description (TEXT) - Short description
description_html (TEXT) - HTML formatted description
product_type (TEXT) - Type of product
featured_image_url (TEXT) - Primary product image
min_price / max_price (DECIMAL) - Price range
created_at / updated_at (TIMESTAMPS)
```

### Product Images Table
Gallery images for products.

```sql
id (UUID)
product_id (UUID) - Links to products table
image_url (TEXT) - Image URL
alt_text (TEXT) - Accessibility alt text
thumbhash (TEXT) - Compact image placeholder
display_order (INTEGER) - Order in gallery
```

### Product Options & Variants
For products with variants (e.g., sizes, colors).

```sql
product_options - Define option types (Size, Color, etc.)
product_option_values - Define values (Small, Medium, Large, etc.)
product_variants - Specific product combinations with pricing
```

## Indexes

The schema includes indexes on frequently queried columns for performance:

- `products(handle)` - For product lookups by URL
- `products(collection_id)` - For filtering by category
- `product_images(product_id)` - For loading gallery images
- `product_variants(product_id)` - For variant loading
- `collections(handle)` - For category lookups

## Seed Data

The `02-seed.sql` file includes 6 sample products across 5 collections:

- **Lamps**: Modern Floor Lamp, Pendant Light, Table Lamp
- **Seats**: Ergonomic Office Chair, Lounge Chair
- **Rugs**: Premium Area Rug
- **Pillows**: Decorative throw pillow (in Miscellaneous)
- **Miscellaneous**: Additional home decor

All products use Unsplash images for realistic previews.

## Notes

- The schema uses `UUID` for all primary keys
- All tables have `created_at` and `updated_at` timestamp fields
- Foreign keys have `ON DELETE CASCADE` for product_images and variants
- The `collections` table has `UNIQUE` constraints on title and handle
- The `products` table has a `UNIQUE` constraint on handle for URL generation

## Integration with Application

Once the database is set up, you can:

1. Query products from Supabase in your server components
2. Update the mock product functions to use real database queries
3. Implement server-side cart storage using the `cart_items` table
4. Add user authentication and cart associations

Example query function:
```typescript
async function getProducts() {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .order('created_at', { ascending: false });
  
  return data;
}
```
