-- Add multiple images to products
-- The product_images table already supports multiple images per product
-- Just insert more rows with different display_order values

-- Add more images for Modern Floor Lamp
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1200&fit=crop', 'Modern floor lamp in living room', NULL, 1
FROM products p WHERE p.handle = 'modern-floor-lamp'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=1200&fit=crop', 'Modern floor lamp detail view', NULL, 2
FROM products p WHERE p.handle = 'modern-floor-lamp'
ON CONFLICT DO NOTHING;

-- Add more images for Pendant Light
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=1200&fit=crop', 'Pendant light in kitchen', NULL, 1
FROM products p WHERE p.handle = 'pendant-light'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=1200&fit=crop', 'Pendant light close-up', NULL, 2
FROM products p WHERE p.handle = 'pendant-light'
ON CONFLICT DO NOTHING;

-- Add images for Leather Office Chair
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1200&fit=crop', 'Black leather office chair', NULL, 0
FROM products p WHERE p.handle = 'leather-office-chair'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=1200&fit=crop', 'Office chair side view', NULL, 1
FROM products p WHERE p.handle = 'leather-office-chair'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=1200&fit=crop', 'Office chair ergonomic features', NULL, 2
FROM products p WHERE p.handle = 'leather-office-chair'
ON CONFLICT DO NOTHING;

-- Add images for Mid-Century Accent Chair
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=1200&fit=crop', 'Cream accent chair', NULL, 0
FROM products p WHERE p.handle = 'mid-century-accent-chair'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=1200&fit=crop', 'Accent chair in room setting', NULL, 1
FROM products p WHERE p.handle = 'mid-century-accent-chair'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1200&fit=crop', 'Accent chair detail', NULL, 2
FROM products p WHERE p.handle = 'mid-century-accent-chair'
ON CONFLICT DO NOTHING;

-- Add images for Wool Area Rug
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1577005228070-88c8d9c3a19f?w=800&h=1200&fit=crop', 'Wool area rug in living room', NULL, 0
FROM products p WHERE p.handle = 'wool-area-rug'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=1200&fit=crop', 'Rug texture close-up', NULL, 1
FROM products p WHERE p.handle = 'wool-area-rug'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=1200&fit=crop', 'Rug pattern detail', NULL, 2
FROM products p WHERE p.handle = 'wool-area-rug'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=1200&fit=crop', 'Rug in bedroom setting', NULL, 3
FROM products p WHERE p.handle = 'wool-area-rug'
ON CONFLICT DO NOTHING;

-- Add images for Geometric Throw Pillow
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1585428505547-5b557f15a8bc?w=800&h=1200&fit=crop', 'Geometric throw pillows on couch', NULL, 0
FROM products p WHERE p.handle = 'geometric-throw-pillow'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=1200&fit=crop', 'Pillow pattern close-up', NULL, 1
FROM products p WHERE p.handle = 'geometric-throw-pillow'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=1200&fit=crop', 'Pillows styled on bed', NULL, 2
FROM products p WHERE p.handle = 'geometric-throw-pillow'
ON CONFLICT DO NOTHING;

-- Add images for Memory Foam Lumbar Pillow
INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800&h=1200&fit=crop', 'Memory foam lumbar pillow', NULL, 0
FROM products p WHERE p.handle = 'memory-foam-lumbar-pillow'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=1200&fit=crop', 'Lumbar pillow on office chair', NULL, 1
FROM products p WHERE p.handle = 'memory-foam-lumbar-pillow'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, thumbhash, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=1200&fit=crop', 'Pillow ergonomic support', NULL, 2
FROM products p WHERE p.handle = 'memory-foam-lumbar-pillow'
ON CONFLICT DO NOTHING;

-- Verify the images were added (run this to check)
-- SELECT p.title, p.handle, COUNT(pi.id) as image_count
-- FROM products p
-- LEFT JOIN product_images pi ON p.id = pi.product_id
-- GROUP BY p.id, p.title, p.handle
-- ORDER BY p.title;
