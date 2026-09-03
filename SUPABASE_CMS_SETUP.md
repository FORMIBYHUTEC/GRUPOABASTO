# CMS de Productos con Supabase

## ⚠️ IMPORTANTE: Seguridad

Las credenciales de Supabase fueron compartidas en el chat. **Debes rotarlas inmediatamente** en el panel de Supabase:
- Settings > API > New API Key
- Actualiza `.env.local` con las nuevas claves

## Archivos creados

1. `.env.local` - Variables de entorno con credenciales de Supabase
2. `.env.local.example` - Plantilla de variables de entorno
3. `lib/supabase.ts` - Cliente público de Supabase
4. `lib/supabase-admin.ts` - Cliente admin de Supabase (server-side)
5. `scripts/setup-supabase.sql` - SQL para crear tablas, categorías, storage y políticas
6. `scripts/seed-products.mjs` - Script para migrar productos existentes a Supabase
7. `app/admin/productos/page.tsx` - Panel de administración CMS
8. `app/api/admin/login/route.ts` - API de login
9. `app/api/admin/logout/route.ts` - API de logout
10. `app/api/admin/products/route.ts` - API CRUD de productos
11. `app/api/admin/upload/route.ts` - API para subir imágenes
12. `app/productos/page.tsx` - Página de productos actualizada para leer de Supabase
13. `components/products/products-grid.tsx` - Grid actualizado con filtrado original
14. `components/dynamic-island-menu-wrapper.tsx` - Wrapper cliente para el menú
15. `components/dynamic-island-menu.tsx` - Carrito actualizado para IDs string
16. `app/layout.tsx` - Agregado Toaster para notificaciones

## Pasos para activar el CMS

## Importar el catálogo con precios, SKU e indicadores

Después de tener creada la tabla `products`, ejecuta en el SQL Editor de Supabase el contenido de:

`supabase/migrations/20260831_import_catalogo_con_precios_1.sql`

La migración sincroniza la tabla `products` con el Excel: agrega los campos `sku`, `catalog_category` e `indicator_codes`, carga los precios de envases y enlaza 81 productos equivalentes del catálogo vigente. Estos conservan su nombre, descripción, categoría e imagen; sólo se les agrega SKU, precio e indicadores. Las imágenes incrustadas en la columna C de `Hoja2` se extraen y suben al bucket `product-images/catalogo-con-precios-1/` de Supabase Storage; la migración asigna al producto la URL de Storage de su misma fila. Al final elimina de la tabla los productos que no estén en este Excel, por lo que el catálogo queda exactamente con sus 164 SKUs únicos. El archivo de origen repite el SKU `PLA-4060-COR`, por lo que se importa una sola vez.

Para volver a cargar las imágenes desde el Excel:

```bash
python3 scripts/extract-catalog-cell-images.py --workbook "/ruta/Catalogo con Precios 1.xlsx"
node scripts/upload-catalog-images-to-supabase.mjs
```

Las versiones que muestra el catálogo se optimizan a WebP antes de subirlas:

```bash
python3 scripts/optimize-catalog-images.py
node scripts/upload-catalog-images-to-supabase.mjs /private/tmp/catalogo-con-precios-1-webp catalogo-con-precios-1/optimized
```

Para comprobar la carga, ejecuta después. El resultado esperado es **164 productos**: 81 conservan su imagen actual y los nuevos toman la imagen disponible en la celda C de su fila del Excel.

```sql
SELECT
  COUNT(*) AS productos_del_excel,
  COUNT(*) FILTER (WHERE image_url IS NULL) AS nuevos_sin_imagen
FROM products;

SELECT sku, name, price, indicator_codes
FROM products
WHERE sku IS NOT NULL
ORDER BY sku
LIMIT 20;
```

### 1. Ejecutar SQL en Supabase

1. Ve al panel de Supabase: https://supabase.com/dashboard/project/pjbmrocrfbzfvivasoxw
2. Abre el SQL Editor
3. Copia y pega el contenido de `scripts/setup-supabase.sql`
4. Ejecuta el script

Esto creará:
- Tabla `products`
- Tabla `categories`
- Bucket de storage `product-images`
- Políticas de seguridad RLS
- Categorías originales con colores de marca

### 2. Migrar productos existentes

```bash
node scripts/seed-products.mjs
```

Esto importa los 125 productos del archivo `products-data.ts` a Supabase.

### 3. Cambiar contraseña de admin

Edita `.env.local`:
```env
ADMIN_PASSWORD=tu-contraseña-segura
```

### 4. Acceder al CMS

La URL del CMS es:
```
http://localhost:3000/admin/productos
```

O en producción:
```
https://tudominio.com/admin/productos
```

Contraseña por defecto: `abasto2024` (cámbiala)

## Funcionalidades del CMS

- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Activar/desactivar productos
- ✅ Subir imágenes al storage de Supabase
- ✅ Filtrar productos por categorías originales
- ✅ Mantener los botones del homepage que filtran por categorías principales

## Cambio de hosting

Se cambió `next.config.mjs` de `output: 'export'` a `output: 'standalone'` para soportar API routes. Esto significa que **necesitas un hosting con Node.js**, no un hosting estático.

Opciones recomendadas:
- Vercel
- Netlify con funciones serverless
- Hostinger VPS con Node.js
- Railway
- Render

Si necesitas mantener el hosting estático actual, el CMS no funcionará con API routes. En ese caso, habría que usar una solución externa para el admin.

## Notas

- El carrito de compras sigue funcionando igual
- Los productos inactivos no aparecen en el sitio público
- Las imágenes se almacenan en el bucket `product-images` de Supabase Storage
- El frontend lee productos activos desde Supabase en tiempo real
