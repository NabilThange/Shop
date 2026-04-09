-- Add specifications column to products table
-- This will store detailed product information like dimensions, material, colors, etc.

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}'::jsonb;

-- Add index for JSONB queries (optional but recommended for performance)
CREATE INDEX IF NOT EXISTS products_specifications_idx ON products USING GIN (specifications);

-- Example: Update a product with specifications
-- Run this to add specifications to your existing products:

UPDATE products 
SET specifications = jsonb_build_object(
  'dimensions', '160 cm × 230 cm',
  'material', '100% natural cowhide, felt backing',
  'colors', 'Mixed browns, whites, blacks with spotted detail',
  'construction', 'Hand-stitched patchwork',
  'backing', 'Soft non-slip felt',
  'care', 'Spot clean with damp cloth; avoid soaking',
  'additional_info', 'Each piece is a work of natural art — durable, warm, and crafted to bring character to your floor.'
)
WHERE handle = 'wool-area-rug';

-- Update other products with their specifications
UPDATE products 
SET specifications = jsonb_build_object(
  'dimensions', 'Height: 150 cm, Base diameter: 30 cm',
  'material', 'Metal frame with fabric shade',
  'colors', 'Available in Black, White, and Brass finishes',
  'bulb_type', 'LED compatible (bulb not included)',
  'wattage', 'Max 60W',
  'care', 'Wipe clean with soft, dry cloth'
)
WHERE handle = 'modern-floor-lamp';

UPDATE products 
SET specifications = jsonb_build_object(
  'dimensions', 'Shade diameter: 25 cm, Cord length: 120 cm',
  'material', 'Glass shade with metal hardware',
  'colors', 'Clear glass with brass or black metal',
  'installation', 'Hardwired ceiling mount',
  'bulb_type', 'E26 base, LED compatible',
  'care', 'Dust regularly; wipe glass with glass cleaner'
)
WHERE handle = 'pendant-light';

UPDATE products 
SET specifications = jsonb_build_object(
  'dimensions', 'Seat height: 48 cm, Overall: 85 cm H × 65 cm W × 70 cm D',
  'material', 'Premium leather upholstery with steel frame',
  'colors', 'Available in Black and Brown',
  'weight_capacity', '120 kg',
  'features', 'Adjustable height, 360° swivel, lumbar support',
  'care', 'Wipe with leather cleaner; condition monthly'
)
WHERE handle = 'leather-office-chair';

UPDATE products 
SET specifications = jsonb_build_object(
  'dimensions', '75 cm H × 70 cm W × 75 cm D',
  'material', 'Solid wood frame with fabric upholstery',
  'colors', 'Cream, Navy, or Charcoal fabric options',
  'style', 'Mid-century modern design',
  'weight_capacity', '135 kg',
  'care', 'Vacuum regularly; spot clean with upholstery cleaner'
)
WHERE handle = 'mid-century-accent-chair';

UPDATE products 
SET specifications = jsonb_build_object(
  'dimensions', '45 cm × 45 cm (set of 2)',
  'material', 'Cotton-polyester blend with polyester fill',
  'colors', 'Multi-color geometric patterns',
  'features', 'Removable covers, hidden zipper',
  'care', 'Machine washable covers (cold water, gentle cycle)',
  'fill', 'Hypoallergenic polyester fiber'
)
WHERE handle = 'geometric-throw-pillow';

UPDATE products 
SET specifications = jsonb_build_object(
  'dimensions', '33 cm × 13 cm × 10 cm',
  'material', 'Memory foam core with breathable mesh cover',
  'colors', 'Black or Gray',
  'features', 'Ergonomic contour, adjustable strap',
  'care', 'Remove cover and machine wash; spot clean foam',
  'use_case', 'Office chairs, car seats, wheelchairs'
)
WHERE handle = 'memory-foam-lumbar-pillow';
