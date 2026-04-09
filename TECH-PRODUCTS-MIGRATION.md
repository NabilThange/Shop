# Tech Products Migration Guide

## Overview
This guide helps you migrate from furniture products to tech products (smartphones, laptops, smart gadgets, etc.).

## What Changed

### New Product Categories
- **Smartphones** - iPhone 15 Pro, Samsung Galaxy S24 Ultra
- **Laptops** - MacBook Pro 16" M3 Max, Dell XPS 15 OLED
- **Smart Gadgets** - Smart Desk Lamp, Wireless Charging Pad, Smart Backpack
- **Audio** - AirPods Pro 2, Sony WH-1000XM5 headphones
- **Accessories** - MX Master 3S Mouse, Mechanical Keyboard RGB

### Products Included (10 total)
1. iPhone 15 Pro (with storage variants: 128GB, 256GB, 512GB)
2. Samsung Galaxy S24 Ultra
3. MacBook Pro 16" M3 Max (with storage variants: 512GB, 1TB, 2TB)
4. Dell XPS 15 OLED
5. Smart Desk Lamp Pro
6. Wireless Charging Pad 3-in-1
7. Smart Backpack with USB
8. AirPods Pro 2nd Gen
9. Sony WH-1000XM5 Headphones
10. MX Master 3S Wireless Mouse
11. Mechanical Keyboard RGB

## Migration Steps

### Step 1: Run the Tech Products Seed File
Execute the SQL file in your Supabase SQL Editor:

```sql
-- Copy and paste the entire contents of:
scripts/05-tech-products-seed.sql
```

This will:
- ✅ Clear all existing furniture products
- ✅ Create new tech product collections
- ✅ Add 11 tech products with detailed specifications
- ✅ Add product images for each product
- ✅ Create variants for products with options (storage sizes)

### Step 2: Code Changes (Already Done!)
The following file was automatically updated:
- `lib/shopify/constants.ts` - Updated category IDs to tech categories

### Step 3: Verify the Migration
After running the SQL:

1. **Check Collections**
   ```sql
   SELECT * FROM collections ORDER BY title;
   ```
   You should see: Accessories, Audio, Laptops, Smart Gadgets, Smartphones

2. **Check Products**
   ```sql
   SELECT title, handle FROM products ORDER BY title;
   ```
   You should see 11 tech products

3. **Check Product Images**
   ```sql
   SELECT p.title, COUNT(pi.id) as image_count
   FROM products p
   LEFT JOIN product_images pi ON p.id = pi.product_id
   GROUP BY p.id, p.title
   ORDER BY p.title;
   ```
   Each product should have 1-3 images

## Product Details

### Smartphones
- **iPhone 15 Pro** - $999-$1,199 (3 storage options)
  - Titanium design, A17 Pro chip, 48MP camera
  - Specs: Display, processor, camera, battery, storage options
  
- **Samsung Galaxy S24 Ultra** - $1,199
  - 200MP camera, S Pen, Galaxy AI features
  - Specs: Display, Snapdragon 8 Gen 3, camera system

### Laptops
- **MacBook Pro 16" M3 Max** - $2,499-$3,499 (3 storage options)
  - M3 Max chip, Liquid Retina XDR display
  - Specs: Up to 128GB RAM, up to 8TB storage
  
- **Dell XPS 15 OLED** - $1,799
  - 15.6" OLED display, Intel Core i9, RTX 4070
  - Specs: 32GB RAM, 1TB SSD, premium aluminum

### Smart Gadgets
- **Smart Desk Lamp Pro** - $89.99
  - Wireless charging, app control, adjustable color temp
  
- **Wireless Charging Pad 3-in-1** - $79.99
  - Charges iPhone, AirPods, Apple Watch simultaneously
  
- **Smart Backpack with USB** - $59.99
  - Anti-theft, USB charging port, 15.6" laptop compartment

### Audio
- **AirPods Pro 2nd Gen** - $249
  - H2 chip, Active Noise Cancellation, Spatial Audio
  
- **Sony WH-1000XM5** - $399
  - Industry-leading ANC, 30-hour battery, premium sound

### Accessories
- **MX Master 3S Wireless Mouse** - $99.99
  - 8K DPI, works on any surface, 70-day battery
  
- **Mechanical Keyboard RGB** - $129.99
  - Hot-swappable switches, per-key RGB, aluminum frame

## Features Included

### Product Specifications
Each product has detailed specifications stored in JSONB format:
- Display/Screen specs
- Processor/Chip information
- Camera details (for phones)
- Battery life
- Storage options
- Connectivity (5G, Wi-Fi, Bluetooth)
- Material and build quality
- Colors available
- Dimensions and weight

### Product Images
- Multiple high-quality images per product
- Proper display_order for vertical stacking
- Alt text for accessibility

### Product Variants
- Storage options for iPhone and MacBook
- Proper SKU codes
- Accurate pricing per variant

## UI Compatibility

### No UI Changes Required!
The existing UI already supports:
- ✅ Multiple product images (vertical stack on desktop)
- ✅ Product specifications display
- ✅ Variant selection (storage options)
- ✅ Collection filtering
- ✅ Product cards with images
- ✅ Detailed product pages

### What Works Out of the Box
1. **Shop Page** - Shows all tech products
2. **Collection Pages** - Filter by Smartphones, Laptops, etc.
3. **Product Detail Pages** - Full specs, multiple images, variants
4. **Cart** - Add to cart, quantity management
5. **Search** - Search across all tech products

## Testing Checklist

After migration, test:
- [ ] Home page displays tech products
- [ ] Shop page shows all 11 products
- [ ] Collection filters work (Smartphones, Laptops, etc.)
- [ ] Product detail pages show specifications
- [ ] Multiple images display vertically on desktop
- [ ] Image carousel works on mobile
- [ ] Variant selection works (iPhone/MacBook storage)
- [ ] Add to cart functionality
- [ ] Product search

## Rollback (If Needed)

If you need to go back to furniture products:
```sql
-- Run the original seed file:
-- scripts/02-seed.sql
```

## Next Steps

1. **Add More Products** - Use the same pattern to add more tech products
2. **Update Images** - Replace Unsplash URLs with your actual product images
3. **Customize Specs** - Adjust specifications to match your actual inventory
4. **Add Reviews** - Consider adding a reviews table for customer feedback
5. **Inventory Management** - Add stock tracking if needed

## Support

If you encounter any issues:
1. Check Supabase logs for SQL errors
2. Verify all foreign key relationships
3. Ensure image URLs are accessible
4. Check browser console for frontend errors
