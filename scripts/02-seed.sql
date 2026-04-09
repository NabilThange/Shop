-- Seed data for collections
INSERT INTO collections (title, handle, description, image_url, image_alt_text)
VALUES
  ('Lamps', 'lamps', 'Stylish and modern lamps for every room', 'https://images.unsplash.com/photo-1565636192335-14f0d6854fe0?w=500&h=500&fit=crop', 'Modern lamp collection'),
  ('Seats', 'seats', 'Comfortable seating solutions', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop', 'Comfortable chairs and seats'),
  ('Rugs', 'rugs', 'Beautiful rugs to enhance your space', 'https://images.unsplash.com/photo-1577005228070-88c8d9c3a19f?w=500&h=500&fit=crop', 'Decorative rugs'),
  ('Pillows', 'pillows', 'Soft and cozy pillows', 'https://images.unsplash.com/photo-1585428505547-5b557f15a8bc?w=500&h=500&fit=crop', 'Comfortable pillows'),
  ('Miscellaneous', 'miscellaneous', 'Other home decor items', 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop', 'Miscellaneous decor')
ON CONFLICT (handle) DO NOTHING;

-- Seed data for products
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, featured_image_thumbhash, min_price, max_price)
SELECT 
  c.id,
  'Modern Floor Lamp',
  'modern-floor-lamp',
  'Sleek and minimalist floor lamp with adjustable brightness',
  '<p>Sleek and minimalist floor lamp with adjustable brightness. Perfect for any modern living space.</p>',
  'Lamp',
  'https://images.unsplash.com/photo-1565636192335-14f0d6854fe0?w=500&h=500&fit=crop',
  'Modern floor lamp',
  'UeYGJ3t7M{of~qt7RjV@0KtRofV@xZt7',
  49.99,
  49.99
FROM collections c WHERE c.handle = 'lamps'
ON CONFLICT (handle) DO NOTHING;

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, featured_image_thumbhash, min_price, max_price)
SELECT 
  c.id,
  'Pendant Light',
  'pendant-light',
  'Beautiful pendant light for kitchen islands and dining areas',
  '<p>Beautiful pendant light perfect for kitchen islands and dining areas. Creates warm ambient lighting.</p>',
  'Lamp',
  'https://images.unsplash.com/photo-1578923506420-58e3e5f75b47?w=500&h=500&fit=crop',
  'Pendant light fixture',
  'UeV~99eFUeoL_NtTx^NGM_s;EsoHwv}',
  79.99,
  79.99
FROM collections c WHERE c.handle = 'lamps'
ON CONFLICT (handle) DO NOTHING;

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, featured_image_thumbhash, min_price, max_price)
SELECT 
  c.id,
  'Leather Office Chair',
  'leather-office-chair',
  'Premium leather office chair with ergonomic support',
  '<p>Premium leather office chair with full ergonomic support. Available in black and brown.</p>',
  'Seat',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
  'Black leather office chair',
  'UeU~:}~qV@t6_4RjOZt7t7RjOZj[',
  199.99,
  249.99
FROM collections c WHERE c.handle = 'seats'
ON CONFLICT (handle) DO NOTHING;

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, featured_image_thumbhash, min_price, max_price)
SELECT 
  c.id,
  'Mid-Century Accent Chair',
  'mid-century-accent-chair',
  'Stylish mid-century modern accent chair',
  '<p>Stylish mid-century modern accent chair in various fabric colors. Perfect for living rooms.</p>',
  'Seat',
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop',
  'Cream colored accent chair',
  'UeWFjv~qj_RjV@^NSIj_',
  349.99,
  349.99
FROM collections c WHERE c.handle = 'seats'
ON CONFLICT (handle) DO NOTHING;

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, featured_image_thumbhash, min_price, max_price)
SELECT 
  c.id,
  'Wool Area Rug',
  'wool-area-rug',
  'Premium wool area rug for living spaces',
  '<p>Premium wool area rug handcrafted from natural materials. Available in multiple sizes and colors.</p>',
  'Rug',
  'https://images.unsplash.com/photo-1577005228070-88c8d9c3a19f?w=500&h=500&fit=crop',
  'Wool area rug',
  'UeU~j}~qV@t6_4RjOZt7',
  299.99,
  599.99
FROM collections c WHERE c.handle = 'rugs'
ON CONFLICT (handle) DO NOTHING;

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, featured_image_thumbhash, min_price, max_price)
SELECT 
  c.id,
  'Geometric Throw Pillow',
  'geometric-throw-pillow',
  'Colorful geometric throw pillow set',
  '<p>Set of 2 colorful geometric throw pillows. Perfect for adding personality to any couch.</p>',
  'Pillow',
  'https://images.unsplash.com/photo-1585428505547-5b557f15a8bc?w=500&h=500&fit=crop',
  'Geometric throw pillows',
  'UeW~j}~qV@t6_4RjOZt7',
  34.99,
  34.99
FROM collections c WHERE c.handle = 'pillows'
ON CONFLICT (handle) DO NOTHING;

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, featured_image_thumbhash, min_price, max_price)
SELECT 
  c.id,
  'Memory Foam Lumbar Pillow',
  'memory-foam-lumbar-pillow',
  'Supportive memory foam lumbar pillow',
  '<p>Supportive memory foam lumbar pillow for better back support. Machine washable cover.</p>',
  'Pillow',
  'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
  'Memory foam lumbar pillow',
  'UeX~j}~qV@t6_4RjOZt7',
  49.99,
  49.99
FROM collections c WHERE c.handle = 'pillows'
ON CONFLICT (handle) DO NOTHING;

-- Add product images
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1565636192335-14f0d6854fe0?w=500&h=500&fit=crop', 'Modern floor lamp side view', 'UeYGJ3t7M{of~qt7RjV@0KtRofV@xZt7', 0
FROM products p WHERE p.handle = 'modern-floor-lamp'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1578923506420-58e3e5f75b47?w=500&h=500&fit=crop', 'Pendant light detail', 'UeV~99eFUeoL_NtTx^NGM_s;EsoHwv}', 0
FROM products p WHERE p.handle = 'pendant-light'
ON CONFLICT DO NOTHING;

-- Add product options and variants for Leather Office Chair
WITH office_chair AS (
  SELECT id FROM products WHERE handle = 'leather-office-chair'
),
size_option AS (
  INSERT INTO product_options (product_id, name, position)
  SELECT id, 'Color', 1 FROM office_chair
  RETURNING id, product_id
),
color_values AS (
  INSERT INTO product_option_values (option_id, value)
  SELECT id, color FROM size_option, (VALUES ('Black'), ('Brown')) AS colors(color)
  RETURNING option_id
)
INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Leather Office Chair - Black', 'CHAIR-001-BLK', 199.99, true, 1 FROM office_chair
UNION ALL
SELECT id, 'Leather Office Chair - Brown', 'CHAIR-001-BRN', 249.99, true, 2 FROM office_chair
ON CONFLICT (sku) DO NOTHING;

-- Add product options and variants for Accent Chair
WITH accent_chair AS (
  SELECT id FROM products WHERE handle = 'mid-century-accent-chair'
),
fabric_option AS (
  INSERT INTO product_options (product_id, name, position)
  SELECT id, 'Fabric', 1 FROM accent_chair
  RETURNING id, product_id
)
INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Mid-Century Accent Chair - Cream', 'CHAIR-002-CRM', 349.99, true, 1 FROM accent_chair
ON CONFLICT (sku) DO NOTHING;

-- Add product options and variants for Wool Area Rug
WITH rug AS (
  SELECT id FROM products WHERE handle = 'wool-area-rug'
),
size_option AS (
  INSERT INTO product_options (product_id, name, position)
  SELECT id, 'Size', 1 FROM rug
  RETURNING id, product_id
),
size_values AS (
  INSERT INTO product_option_values (option_id, value)
  SELECT id, size FROM size_option, (VALUES ('5x7'), ('8x10'), ('9x12')) AS sizes(size)
  RETURNING option_id
)
INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Wool Area Rug - 5x7', 'RUG-001-5X7', 299.99, true, 1 FROM rug
UNION ALL
SELECT id, 'Wool Area Rug - 8x10', 'RUG-001-8X10', 449.99, true, 2 FROM rug
UNION ALL
SELECT id, 'Wool Area Rug - 9x12', 'RUG-001-9X12', 599.99, true, 3 FROM rug
ON CONFLICT (sku) DO NOTHING;

-- Add variants for other products (single variants without options)
INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Modern Floor Lamp', 'LAMP-001', 49.99, true, 1 FROM products WHERE handle = 'modern-floor-lamp'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Pendant Light', 'LAMP-002', 79.99, true, 1 FROM products WHERE handle = 'pendant-light'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Geometric Throw Pillow', 'PILLOW-001', 34.99, true, 1 FROM products WHERE handle = 'geometric-throw-pillow'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Memory Foam Lumbar Pillow', 'PILLOW-002', 49.99, true, 1 FROM products WHERE handle = 'memory-foam-lumbar-pillow'
ON CONFLICT (sku) DO NOTHING;