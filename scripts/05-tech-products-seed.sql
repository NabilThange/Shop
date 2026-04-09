-- Clear existing data and seed with tech products
-- Run this to replace furniture products with tech products

-- Clear existing data
TRUNCATE TABLE cart_items CASCADE;
TRUNCATE TABLE carts CASCADE;
TRUNCATE TABLE variant_selected_options CASCADE;
TRUNCATE TABLE variants CASCADE;
TRUNCATE TABLE product_option_values CASCADE;
TRUNCATE TABLE product_options CASCADE;
TRUNCATE TABLE product_images CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE collections CASCADE;

-- Seed tech product collections
INSERT INTO collections (title, handle, description, image_url, image_alt_text)
VALUES
  ('Smartphones', 'smartphones', 'Latest flagship and budget smartphones', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', 'Modern smartphones'),
  ('Laptops', 'laptops', 'Powerful laptops for work and gaming', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop', 'Laptop computers'),
  ('Smart Gadgets', 'smart-gadgets', 'Cool smart home and desk gadgets', 'https://images.unsplash.com/photo-1558089687-e1c6e5b04b4e?w=500&h=500&fit=crop', 'Smart tech gadgets'),
  ('Audio', 'audio', 'Headphones, earbuds, and speakers', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'Audio equipment'),
  ('Accessories', 'accessories', 'Tech accessories and peripherals', 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop', 'Tech accessories')
ON CONFLICT (handle) DO NOTHING;

-- Seed smartphones
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'iPhone 15 Pro',
  'iphone-15-pro',
  'Titanium design with A17 Pro chip and advanced camera system',
  '<p>The iPhone 15 Pro features a stunning titanium design, powerful A17 Pro chip, and professional-grade camera system with 5x optical zoom.</p>',
  'Smartphone',
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=1200&fit=crop',
  'iPhone 15 Pro in titanium',
  999.00,
  1199.00
FROM collections c WHERE c.handle = 'smartphones';

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'Samsung Galaxy S24 Ultra',
  'samsung-galaxy-s24-ultra',
  'AI-powered flagship with S Pen and 200MP camera',
  '<p>Samsung Galaxy S24 Ultra brings AI to your fingertips with Galaxy AI features, stunning 200MP camera, and built-in S Pen.</p>',
  'Smartphone',
  'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=1200&fit=crop',
  'Samsung Galaxy S24 Ultra',
  1199.00,
  1199.00
FROM collections c WHERE c.handle = 'smartphones';

-- Seed laptops
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'MacBook Pro 16" M3 Max',
  'macbook-pro-16-m3-max',
  'Ultimate pro laptop with M3 Max chip and Liquid Retina XDR display',
  '<p>MacBook Pro 16" with M3 Max delivers unprecedented performance for professionals with up to 128GB unified memory and stunning display.</p>',
  'Laptop',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=1200&fit=crop',
  'MacBook Pro on desk',
  2499.00,
  3999.00
FROM collections c WHERE c.handle = 'laptops';

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'Dell XPS 15 OLED',
  'dell-xps-15-oled',
  'Premium Windows laptop with stunning OLED display',
  '<p>Dell XPS 15 features a gorgeous 15.6" OLED display, Intel Core i9 processor, and sleek aluminum design perfect for creators.</p>',
  'Laptop',
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=1200&fit=crop',
  'Dell XPS laptop',
  1799.00,
  2499.00
FROM collections c WHERE c.handle = 'laptops';

-- Seed smart gadgets
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'Smart Desk Lamp Pro',
  'smart-desk-lamp-pro',
  'AI-powered desk lamp with wireless charging and app control',
  '<p>Smart Desk Lamp Pro features adjustable color temperature, wireless phone charging, and voice control compatibility.</p>',
  'Smart Gadget',
  'https://images.unsplash.com/photo-1565636192335-14f0d6854fe0?w=800&h=1200&fit=crop',
  'Modern smart desk lamp',
  89.99,
  89.99
FROM collections c WHERE c.handle = 'smart-gadgets';

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'Wireless Charging Pad 3-in-1',
  'wireless-charging-pad-3in1',
  'Charge your iPhone, AirPods, and Apple Watch simultaneously',
  '<p>Premium 3-in-1 wireless charging station with fast charging support and sleek aluminum design.</p>',
  'Smart Gadget',
  'https://images.unsplash.com/photo-1591290619762-c588f7e8e86f?w=800&h=1200&fit=crop',
  'Wireless charging station',
  79.99,
  79.99
FROM collections c WHERE c.handle = 'smart-gadgets';

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'Smart Backpack with USB',
  'smart-backpack-usb',
  'Anti-theft backpack with built-in USB charging port',
  '<p>Water-resistant smart backpack with hidden pockets, USB charging port, and laptop compartment up to 15.6 inches.</p>',
  'Smart Gadget',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1200&fit=crop',
  'Modern tech backpack',
  59.99,
  59.99
FROM collections c WHERE c.handle = 'smart-gadgets';

-- Seed audio products
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'AirPods Pro 2nd Gen',
  'airpods-pro-2',
  'Active noise cancellation with adaptive transparency',
  '<p>AirPods Pro with H2 chip deliver 2x more active noise cancellation and personalized spatial audio.</p>',
  'Audio',
  'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=1200&fit=crop',
  'AirPods Pro wireless earbuds',
  249.00,
  249.00
FROM collections c WHERE c.handle = 'audio';

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'Sony WH-1000XM5',
  'sony-wh1000xm5',
  'Industry-leading noise canceling headphones',
  '<p>Sony WH-1000XM5 headphones feature exceptional sound quality, 30-hour battery life, and best-in-class noise cancellation.</p>',
  'Audio',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1200&fit=crop',
  'Sony noise canceling headphones',
  399.00,
  399.00
FROM collections c WHERE c.handle = 'audio';

-- Seed accessories
INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'MX Master 3S Wireless Mouse',
  'mx-master-3s',
  'Premium wireless mouse for productivity',
  '<p>Logitech MX Master 3S features ultra-quiet clicks, 8K DPI sensor, and works on any surface including glass.</p>',
  'Accessory',
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=1200&fit=crop',
  'Wireless ergonomic mouse',
  99.99,
  99.99
FROM collections c WHERE c.handle = 'accessories';

INSERT INTO products (collection_id, title, handle, description, description_html, product_type, featured_image_url, featured_image_alt_text, min_price, max_price)
SELECT 
  c.id,
  'Mechanical Keyboard RGB',
  'mechanical-keyboard-rgb',
  'Hot-swappable mechanical keyboard with RGB lighting',
  '<p>Premium mechanical keyboard with Gateron switches, per-key RGB lighting, and aluminum frame.</p>',
  'Accessory',
  'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=1200&fit=crop',
  'RGB mechanical keyboard',
  129.99,
  129.99
FROM collections c WHERE c.handle = 'accessories';

-- Add product images for smartphones
INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=1200&fit=crop', 'iPhone 15 Pro titanium finish', 0
FROM products p WHERE p.handle = 'iphone-15-pro';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1695048133364-1d95a1e4f615?w=800&h=1200&fit=crop', 'iPhone 15 Pro camera system', 1
FROM products p WHERE p.handle = 'iphone-15-pro';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1695048133526-21b0e8d0a7e9?w=800&h=1200&fit=crop', 'iPhone 15 Pro display', 2
FROM products p WHERE p.handle = 'iphone-15-pro';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=1200&fit=crop', 'Samsung Galaxy S24 Ultra', 0
FROM products p WHERE p.handle = 'samsung-galaxy-s24-ultra';

INSERT INTO product_images (product_id, image_url, alt_text, display_order)
SELECT p.id, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=1200&fit=crop', 'Galaxy S24 Ultra with S Pen', 1
FROM products p WHERE p.handle = 'samsung-galaxy-s24-ultra';

-- Add product specifications for tech products
UPDATE products 
SET specifications = jsonb_build_object(
  'display', '6.1" Super Retina XDR OLED, 2556x1179, 120Hz ProMotion',
  'processor', 'A17 Pro chip with 6-core CPU',
  'camera', '48MP Main, 12MP Ultra Wide, 12MP Telephoto (5x optical zoom)',
  'battery', 'Up to 29 hours video playback',
  'storage', '128GB, 256GB, 512GB, 1TB options',
  'material', 'Titanium frame with textured matte glass back',
  'colors', 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium',
  'connectivity', '5G, Wi-Fi 6E, Bluetooth 5.3, USB-C',
  'water_resistance', 'IP68 (maximum depth of 6 meters up to 30 minutes)'
)
WHERE handle = 'iphone-15-pro';

UPDATE products 
SET specifications = jsonb_build_object(
  'display', '6.8" Dynamic AMOLED 2X, 3120x1440, 120Hz adaptive',
  'processor', 'Snapdragon 8 Gen 3 for Galaxy',
  'camera', '200MP Wide, 50MP Periscope Telephoto, 12MP Ultra Wide, 10MP Telephoto',
  'battery', '5000mAh with 45W fast charging',
  'storage', '256GB, 512GB, 1TB with 12GB RAM',
  'special_features', 'Built-in S Pen, Galaxy AI features',
  'colors', 'Titanium Gray, Titanium Black, Titanium Violet, Titanium Yellow',
  'connectivity', '5G, Wi-Fi 7, Bluetooth 5.3, USB-C 3.2',
  'water_resistance', 'IP68 dust and water resistant'
)
WHERE handle = 'samsung-galaxy-s24-ultra';

UPDATE products 
SET specifications = jsonb_build_object(
  'display', '16.2" Liquid Retina XDR, 3456x2234, 120Hz ProMotion',
  'processor', 'Apple M3 Max chip with up to 16-core CPU and 40-core GPU',
  'memory', 'Up to 128GB unified memory',
  'storage', '512GB, 1TB, 2TB, 4TB, 8TB SSD options',
  'battery', 'Up to 22 hours video playback',
  'ports', '3x Thunderbolt 4 (USB-C), HDMI, SDXC card slot, MagSafe 3',
  'audio', 'Six-speaker sound system with spatial audio',
  'camera', '1080p FaceTime HD camera',
  'weight', '2.15 kg (4.7 pounds)',
  'colors', 'Space Black, Silver'
)
WHERE handle = 'macbook-pro-16-m3-max';

UPDATE products 
SET specifications = jsonb_build_object(
  'display', '15.6" OLED 3.5K (3456x2160), 400 nits, 100% DCI-P3',
  'processor', 'Intel Core i9-13900H (14 cores, up to 5.4GHz)',
  'graphics', 'NVIDIA GeForce RTX 4070 8GB GDDR6',
  'memory', '32GB DDR5 RAM',
  'storage', '1TB PCIe NVMe SSD',
  'battery', '86Wh battery, up to 13 hours',
  'ports', '2x Thunderbolt 4, USB-C 3.2, SD card reader, 3.5mm jack',
  'weight', '1.96 kg (4.31 pounds)',
  'material', 'CNC machined aluminum',
  'colors', 'Platinum Silver, Graphite'
)
WHERE handle = 'dell-xps-15-oled';

UPDATE products 
SET specifications = jsonb_build_object(
  'brightness', 'Adjustable 2700K-6500K color temperature',
  'power', '15W LED with 1000 lumens max output',
  'charging', 'Built-in 10W wireless Qi charging pad',
  'control', 'Touch controls, app control (iOS/Android), voice assistant compatible',
  'features', 'Auto-dimming, focus timer, ambient light sensor',
  'material', 'Aluminum alloy base with ABS lamp head',
  'dimensions', '45cm height, 20cm base diameter',
  'colors', 'Space Gray, Silver, Black',
  'connectivity', 'Wi-Fi 2.4GHz, Bluetooth 5.0'
)
WHERE handle = 'smart-desk-lamp-pro';

UPDATE products 
SET specifications = jsonb_build_object(
  'charging_power', 'iPhone: 15W, Apple Watch: 5W, AirPods: 5W',
  'compatibility', 'iPhone 12 and later, Apple Watch Series 1-9, AirPods with wireless case',
  'material', 'Aluminum base with premium silicone charging surfaces',
  'safety', 'Over-current, over-voltage, over-temperature protection',
  'dimensions', '20cm x 10cm x 12cm',
  'weight', '450g',
  'cable', '1.5m USB-C cable included',
  'colors', 'Space Gray, Silver, Rose Gold',
  'certifications', 'Qi-certified, FCC, CE approved'
)
WHERE handle = 'wireless-charging-pad-3in1';

UPDATE products 
SET specifications = jsonb_build_object(
  'capacity', '30L main compartment',
  'laptop_compartment', 'Fits up to 15.6" laptops with padded protection',
  'material', 'Water-resistant polyester with YKK zippers',
  'usb_port', 'External USB charging port (power bank not included)',
  'features', 'Hidden anti-theft pocket, luggage strap, reflective strips',
  'dimensions', '45cm H x 30cm W x 15cm D',
  'weight', '0.9 kg',
  'colors', 'Black, Gray, Navy Blue',
  'warranty', '1-year manufacturer warranty'
)
WHERE handle = 'smart-backpack-usb';

UPDATE products 
SET specifications = jsonb_build_object(
  'chip', 'Apple H2 chip',
  'noise_cancellation', 'Active Noise Cancellation with Adaptive Transparency',
  'audio', 'Adaptive EQ, Personalized Spatial Audio with dynamic head tracking',
  'battery', 'Up to 6 hours listening time (ANC on), 30 hours with case',
  'charging', 'MagSafe, Qi wireless, Lightning, USB-C',
  'controls', 'Touch control, volume swipe, press for ANC/Transparency',
  'water_resistance', 'IPX4 sweat and water resistant',
  'connectivity', 'Bluetooth 5.3',
  'included', 'Four pairs of silicone tips (XS, S, M, L)'
)
WHERE handle = 'airpods-pro-2';

UPDATE products 
SET specifications = jsonb_build_object(
  'driver', '30mm driver units',
  'noise_cancellation', 'Industry-leading ANC with 8 microphones',
  'battery', 'Up to 30 hours with ANC, 40 hours without',
  'charging', 'USB-C quick charge: 3 min = 3 hours playback',
  'audio', 'LDAC, DSEE Extreme, 360 Reality Audio',
  'controls', 'Touch sensor controls, speak-to-chat, wearing detection',
  'weight', '250g',
  'connectivity', 'Bluetooth 5.2, multipoint connection',
  'included', 'Carrying case, USB-C cable, 3.5mm audio cable, airplane adapter'
)
WHERE handle = 'sony-wh1000xm5';

UPDATE products 
SET specifications = jsonb_build_object(
  'sensor', '8000 DPI Darkfield sensor (works on any surface)',
  'buttons', '7 programmable buttons',
  'scroll_wheel', 'MagSpeed electromagnetic scroll wheel',
  'battery', 'Up to 70 days on full charge',
  'charging', 'USB-C fast charging: 1 min = 3 hours',
  'connectivity', 'Bluetooth, USB receiver, up to 3 devices',
  'software', 'Logi Options+ for customization',
  'dimensions', '124.9mm x 84.3mm x 51mm',
  'weight', '141g',
  'colors', 'Graphite, Pale Gray'
)
WHERE handle = 'mx-master-3s';

UPDATE products 
SET specifications = jsonb_build_object(
  'switches', 'Hot-swappable Gateron mechanical switches (Red/Blue/Brown)',
  'keycaps', 'Double-shot PBT keycaps',
  'lighting', 'Per-key RGB with 16.8M colors',
  'layout', 'Full-size 104 keys with numpad',
  'connectivity', 'USB-C wired (detachable cable)',
  'polling_rate', '1000Hz',
  'material', 'Aluminum top plate, ABS base',
  'features', 'N-key rollover, programmable macros',
  'software', 'RGB control software for Windows/Mac',
  'dimensions', '440mm x 135mm x 38mm',
  'weight', '1.1 kg'
)
WHERE handle = 'mechanical-keyboard-rgb';

-- Add variants for products with options
-- iPhone 15 Pro variants (Storage options)
WITH iphone AS (
  SELECT id FROM products WHERE handle = 'iphone-15-pro'
),
storage_option AS (
  INSERT INTO product_options (product_id, name, position)
  SELECT id, 'Storage', 1 FROM iphone
  RETURNING id, product_id
)
INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'iPhone 15 Pro - 128GB', 'IPHONE15PRO-128', 999.00, true, 1 FROM iphone
UNION ALL
SELECT id, 'iPhone 15 Pro - 256GB', 'IPHONE15PRO-256', 1099.00, true, 2 FROM iphone
UNION ALL
SELECT id, 'iPhone 15 Pro - 512GB', 'IPHONE15PRO-512', 1199.00, true, 3 FROM iphone;

-- MacBook Pro variants (Storage options)
WITH macbook AS (
  SELECT id FROM products WHERE handle = 'macbook-pro-16-m3-max'
),
storage_option AS (
  INSERT INTO product_options (product_id, name, position)
  SELECT id, 'Storage', 1 FROM macbook
  RETURNING id, product_id
)
INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'MacBook Pro 16" - 512GB', 'MBP16-512', 2499.00, true, 1 FROM macbook
UNION ALL
SELECT id, 'MacBook Pro 16" - 1TB', 'MBP16-1TB', 2999.00, true, 2 FROM macbook
UNION ALL
SELECT id, 'MacBook Pro 16" - 2TB', 'MBP16-2TB', 3499.00, true, 3 FROM macbook;

-- Add single variants for products without options
INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Samsung Galaxy S24 Ultra', 'S24ULTRA-256', 1199.00, true, 1 FROM products WHERE handle = 'samsung-galaxy-s24-ultra';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Dell XPS 15 OLED', 'XPS15-OLED', 1799.00, true, 1 FROM products WHERE handle = 'dell-xps-15-oled';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Smart Desk Lamp Pro', 'LAMP-SMART-01', 89.99, true, 1 FROM products WHERE handle = 'smart-desk-lamp-pro';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Wireless Charging Pad 3-in-1', 'CHARGE-3IN1', 79.99, true, 1 FROM products WHERE handle = 'wireless-charging-pad-3in1';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Smart Backpack with USB', 'BACKPACK-USB', 59.99, true, 1 FROM products WHERE handle = 'smart-backpack-usb';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'AirPods Pro 2nd Gen', 'AIRPODS-PRO2', 249.00, true, 1 FROM products WHERE handle = 'airpods-pro-2';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Sony WH-1000XM5', 'SONY-XM5', 399.00, true, 1 FROM products WHERE handle = 'sony-wh1000xm5';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'MX Master 3S Wireless Mouse', 'MX-MASTER-3S', 99.99, true, 1 FROM products WHERE handle = 'mx-master-3s';

INSERT INTO variants (product_id, title, sku, price, available_for_sale, position)
SELECT id, 'Mechanical Keyboard RGB', 'KB-MECH-RGB', 129.99, true, 1 FROM products WHERE handle = 'mechanical-keyboard-rgb';
