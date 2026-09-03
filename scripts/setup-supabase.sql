-- =====================================================
-- GRUPO ABASTO - SUPABASE SETUP
-- Ejecutar esto en el SQL Editor de Supabase
-- =====================================================

-- 1. Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 2. Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL REFERENCES categories(id),
  image_url TEXT,
  price NUMERIC(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insertar categorías originales con colores de marca
INSERT INTO categories (id, name, color, sort_order) VALUES
  ('limpieza-general', 'Limpieza General', '#3a9e45', 1),
  ('utensilios', 'Utensilios', '#2a7abf', 2),
  ('bolsas', 'Bolsas', '#1a8c7a', 3),
  ('papel', 'Papel', '#7a5abf', 4),
  ('desechables', 'Desechables', '#0e7490', 5),
  ('vasos', 'Vasos', '#d97706', 6),
  ('industrial', 'Industrial', '#163347', 7),
  ('papeleria', 'Papelería', '#dc2626', 8)
ON CONFLICT (id) DO NOTHING;

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 5. Políticas para lectura pública (sitio web)
CREATE POLICY "Allow public read products" ON products
  FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Allow public read categories" ON categories
  FOR SELECT TO anon USING (true);

-- 6. Políticas para admin (service_role)
CREATE POLICY "Allow service role full access products" ON products
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow service role full access categories" ON categories
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 7. Crear bucket de storage para imágenes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 8. Políticas de storage para lectura pública
CREATE POLICY "Allow public read product images" ON storage.objects
  FOR SELECT TO anon USING (bucket_id = 'product-images');

CREATE POLICY "Allow service role upload product images" ON storage.objects
  FOR ALL TO service_role USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

-- 9. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_name ON products USING gin(to_tsvector('spanish', name));
