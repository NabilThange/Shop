-- Add featured and display_order columns to products table
-- This allows marking products as featured for homepage display

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS products_featured_idx ON products(featured, display_order);

-- Mark iPhone 15 Pro as the main featured product
UPDATE products 
SET featured = TRUE, display_order = 1 
WHERE handle = 'iphone-15-pro';

-- Mark a few other products as featured with lower priority
UPDATE products 
SET featured = TRUE, display_order = 2 
WHERE handle = 'samsung-galaxy-s24-ultra';

UPDATE products 
SET featured = TRUE, display_order = 3 
WHERE handle = 'macbook-pro-16-m3-max';

UPDATE products 
SET featured = TRUE, display_order = 4 
WHERE handle = 'dell-xps-15';

UPDATE products 
SET featured = TRUE, display_order = 5 
WHERE handle = 'smart-watch-pro';

UPDATE products 
SET featured = TRUE, display_order = 6 
WHERE handle = 'wireless-earbuds-anc';

UPDATE products 
SET featured = TRUE, display_order = 7 
WHERE handle = 'smart-backpack-usb';

UPDATE products 
SET featured = TRUE, display_order = 8 
WHERE handle = 'airpods-pro-2';
