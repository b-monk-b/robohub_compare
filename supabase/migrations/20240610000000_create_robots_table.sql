-- Create robots table
CREATE TABLE IF NOT EXISTS public.robots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  type TEXT NOT NULL,
  application TEXT NOT NULL,
  payload_kg NUMERIC(10, 2),
  reach_m NUMERIC(10, 2),
  price_range TEXT,
  price_min_inr NUMERIC(15, 2),
  price_max_inr NUMERIC(15, 2),
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_robots_brand ON public.robots (brand);
CREATE INDEX IF NOT EXISTS idx_robots_type ON public.robots (type);
CREATE INDEX IF NOT EXISTS idx_robots_application ON public.robots (application);
CREATE INDEX IF NOT EXISTS idx_robots_price_range ON public.robots (price_min_inr, price_max_inr);

-- Enable Row Level Security
ALTER TABLE public.robots ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" 
ON public.robots 
FOR SELECT 
TO public 
USING (true);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_robots_updated_at
BEFORE UPDATE ON public.robots
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comments for better documentation
COMMENT ON TABLE public.robots IS 'Stores information about industrial and service robots available for comparison';
COMMENT ON COLUMN public.robots.type IS 'Type of robot (e.g., Articulated, SCARA, Delta, Collaborative, Mobile, etc.)';
COMMENT ON COLUMN public.robots.application IS 'Primary application area (e.g., Material Handling, Assembly, Packaging, etc.)';
COMMENT ON COLUMN public.robots.specifications IS 'JSONB field for flexible storage of detailed specifications';
COMMENT ON COLUMN public.robots.features IS 'JSONB array of key features';
COMMENT ON COLUMN public.robots.gallery_urls IS 'JSONB array of additional image URLs for the robot gallery';

-- Create a function to search robots
CREATE OR REPLACE FUNCTION search_robots(search_term TEXT)
RETURNS SETOF public.robots AS $$
  SELECT *
  FROM public.robots
  WHERE 
    to_tsvector('english', 
      COALESCE(name, '') || ' ' ||
      COALESCE(brand, '') || ' ' ||
      COALESCE(model, '') || ' ' ||
      COALESCE(description, '') || ' ' ||
      COALESCE(application, '')
    ) @@ plainto_tsquery('english', search_term)
    OR name ILIKE '%' || search_term || '%'
    OR brand ILIKE '%' || search_term || '%'
    OR model ILIKE '%' || search_term || '%';
$$ LANGUAGE sql STABLE;
