-- Add new tech products with multiple images

-- Xiaomi Mi 11
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Xiaomi Mi 11',
  'xiaomi-mi-11',
  'Flagship smartphone with Snapdragon 888 and 108MP camera',
  '<p>Xiaomi Mi 11 features Snapdragon 888 processor, stunning 108MP camera, and 120Hz AMOLED display for an exceptional mobile experience.</p>',
  'Smartphone',
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=1200&fit=crop',
  'Xiaomi Mi 11',
  699.00,
  799.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'smartphones';

-- Xiaomi Mi 11 Lite 5G
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Xiaomi Mi 11 Lite 5G',
  'xiaomi-mi-11-lite-5g',
  'Lightweight 5G smartphone with vibrant AMOLED display',
  '<p>Xiaomi Mi 11 Lite 5G combines sleek design with powerful 5G connectivity, featuring a stunning AMOLED display and versatile camera system.</p>',
  'Smartphone',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=1200&fit=crop',
  'Xiaomi Mi 11 Lite 5G',
  399.00,
  449.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'smartphones';

-- AirPods Pro 4
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'AirPods Pro 4',
  'airpods-pro-4',
  'Next-gen AirPods with enhanced noise cancellation',
  '<p>AirPods Pro 4 deliver superior active noise cancellation, adaptive audio, and personalized spatial audio for an immersive listening experience.</p>',
  'Audio',
  'https://pin.it/67i86FiHk',
  'AirPods Pro 4',
  249.00,
  249.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'audio';

-- Sony Wireless Bluetooth Headphones
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Sony Wireless Bluetooth Headphones',
  'sony-wireless-bluetooth-headphones',
  'Premium over-ear headphones with exceptional sound quality',
  '<p>Sony Wireless Bluetooth Headphones feature industry-leading noise cancellation, 30-hour battery life, and premium sound quality for audiophiles.</p>',
  'Audio',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1200&fit=crop',
  'Sony Wireless Bluetooth Headphones',
  349.00,
  349.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'audio';

-- Samsung Galaxy Fit3
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Samsung Galaxy Fit3',
  'samsung-galaxy-fit3',
  'Advanced fitness tracker with health monitoring',
  '<p>Samsung Galaxy Fit3 tracks your fitness goals with advanced health monitoring, sleep tracking, and up to 13 days of battery life.</p>',
  'Smart Gadget',
  'https://pin.it/3FpKQw0cb',
  'Samsung Galaxy Fit3',
  59.00,
  59.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'smart-gadgets';

-- Xiaomi 165W Power Bank 10000mAh
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Xiaomi 165W Power Bank 10000mAh',
  'xiaomi-165w-power-bank',
  'Ultra-fast charging power bank with 165W output',
  '<p>Xiaomi 165W Power Bank delivers lightning-fast charging with 10000mAh capacity, perfect for charging laptops, phones, and tablets on the go.</p>',
  'Accessory',
  'https://pin.it/5rQBjU38o',
  'Xiaomi 165W Power Bank',
  79.00,
  79.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'accessories';

-- Logitech M720 Gaming Mouse
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Logitech M720 Gaming Mouse',
  'logitech-m720-gaming-mouse',
  'Precision gaming mouse with customizable buttons',
  '<p>Logitech M720 Gaming Mouse features high-precision sensor, customizable RGB lighting, and programmable buttons for competitive gaming.</p>',
  'Accessory',
  'https://pin.it/4F7E0xayP',
  'Logitech M720 Gaming Mouse',
  69.00,
  69.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'accessories';

-- Redragon Mechanical Keyboard
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Redragon Mechanical Keyboard',
  'redragon-mechanical-keyboard',
  'RGB mechanical gaming keyboard with tactile switches',
  '<p>Redragon Mechanical Keyboard delivers satisfying tactile feedback with RGB backlighting, durable mechanical switches, and anti-ghosting technology.</p>',
  'Accessory',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=1200&fit=crop',
  'Redragon Mechanical Keyboard',
  89.00,
  89.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'accessories';

-- Philips Hue Go Smart Desk Lamp
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Philips Hue Go Smart Desk Lamp',
  'philips-hue-go-smart-lamp',
  'Smart LED desk lamp with app control and color changing',
  '<p>Philips Hue Go Smart Desk Lamp offers millions of colors, voice control compatibility, and customizable lighting scenes for your workspace.</p>',
  'Smart Gadget',
  'https://pin.it/4tWas2pmN',
  'Philips Hue Go Smart Desk Lamp',
  79.00,
  79.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'smart-gadgets';

-- Casio Digital Alarm Clock
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price, featured, display_order)
SELECT 
  c.id,
  'Casio Digital Alarm Clock',
  'casio-digital-alarm-clock',
  'Classic digital alarm clock with LED display',
  '<p>Casio Digital Alarm Clock features large LED display, multiple alarm settings, and battery backup for reliable timekeeping.</p>',
  'Accessory',
  'https://pin.it/7zjFrhBRU',
  'Casio Digital Alarm Clock',
  29.00,
  29.00,
  FALSE,
  0
FROM collections c WHERE c.handle = 'accessories';

-- Add additional product images
-- Xiaomi Mi 11 additional images
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/3LUfYPQIT',
  'Xiaomi Mi 11 view 2',
  2
FROM products p WHERE p.handle = 'xiaomi-mi-11';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/3LUfYPQIT',
  'Xiaomi Mi 11 view 3',
  3
FROM products p WHERE p.handle = 'xiaomi-mi-11';

-- AirPods Pro 4 additional images
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/67i86FiHk',
  'AirPods Pro 4 view 2',
  2
FROM products p WHERE p.handle = 'airpods-pro-4';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/2ePu6SQX0',
  'AirPods Pro 4 view 3',
  3
FROM products p WHERE p.handle = 'airpods-pro-4';

-- Sony Wireless Bluetooth Headphones additional images
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/497AJWVsE',
  'Sony Headphones view 2',
  2
FROM products p WHERE p.handle = 'sony-wireless-bluetooth-headphones';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/56UFknzA2',
  'Sony Headphones view 3',
  3
FROM products p WHERE p.handle = 'sony-wireless-bluetooth-headphones';

-- Samsung Galaxy Fit3 additional images
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/1EYA1HbtL',
  'Samsung Galaxy Fit3 view 2',
  2
FROM products p WHERE p.handle = 'samsung-galaxy-fit3';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/2JvYIXrlC',
  'Samsung Galaxy Fit3 view 3',
  3
FROM products p WHERE p.handle = 'samsung-galaxy-fit3';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/2o1BCfABw',
  'Samsung Galaxy Fit3 view 4',
  4
FROM products p WHERE p.handle = 'samsung-galaxy-fit3';

-- Xiaomi Power Bank additional image
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/oQCsWEInv',
  'Xiaomi Power Bank view 2',
  2
FROM products p WHERE p.handle = 'xiaomi-165w-power-bank';

-- Logitech Mouse additional images
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/6z2WZHB9O',
  'Logitech M720 view 2',
  2
FROM products p WHERE p.handle = 'logitech-m720-gaming-mouse';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/6z2WZHB9O',
  'Logitech M720 view 3',
  3
FROM products p WHERE p.handle = 'logitech-m720-gaming-mouse';

-- Redragon Keyboard additional images
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/1qlquTY3f',
  'Redragon Keyboard view 2',
  2
FROM products p WHERE p.handle = 'redragon-mechanical-keyboard';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/6Nmp47kzP',
  'Redragon Keyboard view 3',
  3
FROM products p WHERE p.handle = 'redragon-mechanical-keyboard';

-- Philips Lamp additional image
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/3AHRPQ0sd',
  'Philips Hue Lamp view 2',
  2
FROM products p WHERE p.handle = 'philips-hue-go-smart-lamp';

-- Casio Clock additional image
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT 
  p.id,
  'https://pin.it/2koebNBXl',
  'Casio Clock view 2',
  2
FROM products p WHERE p.handle = 'casio-digital-alarm-clock';

-- WARNING: Pinterest links (pin.it/*) are redirect URLs and will NOT display as images
-- You MUST replace these with actual image URLs by:
-- 1. Opening each pin.it link in a browser
-- 2. Right-clicking the image and selecting "Copy image address"
-- 3. Running UPDATE queries to replace the pin.it URLs with the actual image URLs
