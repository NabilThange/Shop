# Quick Start: Tech Products

## 🚀 One Command Migration

Run this in your Supabase SQL Editor:

```sql
-- Copy and paste the entire file: scripts/05-tech-products-seed.sql
```

That's it! Your store now sells tech products instead of furniture.

## What You Get

### 5 Collections
- Smartphones
- Laptops  
- Smart Gadgets
- Audio
- Accessories

### 11 Products
1. iPhone 15 Pro ($999-$1,199)
2. Samsung Galaxy S24 Ultra ($1,199)
3. MacBook Pro 16" M3 Max ($2,499-$3,499)
4. Dell XPS 15 OLED ($1,799)
5. Smart Desk Lamp Pro ($89.99)
6. Wireless Charging Pad 3-in-1 ($79.99)
7. Smart Backpack with USB ($59.99)
8. AirPods Pro 2nd Gen ($249)
9. Sony WH-1000XM5 ($399)
10. MX Master 3S Mouse ($99.99)
11. Mechanical Keyboard RGB ($129.99)

## Features Included

✅ Multiple product images (1-3 per product)
✅ Detailed specifications (display, processor, battery, etc.)
✅ Product variants (storage options for iPhone & MacBook)
✅ Proper pricing and SKUs
✅ High-quality Unsplash images
✅ SEO-friendly descriptions

## No Code Changes Needed

The UI automatically adapts to show:
- Tech product categories
- Product specifications
- Multiple images vertically stacked
- Variant selectors for storage options

## Verify It Worked

```sql
-- Check collections
SELECT title FROM collections ORDER BY title;

-- Check products  
SELECT title, handle FROM products ORDER BY title;

-- Check images
SELECT p.title, COUNT(pi.id) as images
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
GROUP BY p.title
ORDER BY p.title;
```

## Next Steps

1. Visit your shop page - see all tech products
2. Click on a product - see specs and multiple images
3. Try variant selection on iPhone or MacBook
4. Add products to cart

## Customize

Want to add your own products? Follow the pattern in `scripts/05-tech-products-seed.sql`:

1. Add to collections table
2. Add to products table with specifications
3. Add to product_images table
4. Add to variants table

Done! 🎉
