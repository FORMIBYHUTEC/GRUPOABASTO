import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const PUBLIC_DIR = "./public"
const BUCKET = "product-images"

async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath)
    return true
  } catch {
    return false
  }
}

async function getProductsFromDb() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image_url")
    .order("id")

  if (error) {
    console.error("Error fetching products:", error)
    process.exit(1)
  }

  return data || []
}

async function uploadImage(filePath, filename) {
  const content = await fs.promises.readFile(filePath)
  const ext = path.extname(filename).toLowerCase()
  const mimeType =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".webp"
      ? "image/webp"
      : "image/png"

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, content, {
      cacheControl: "3600",
      upsert: true,
      contentType: mimeType,
    })

  if (error) {
    throw error
  }

  const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
  return publicUrl.publicUrl
}

async function updateProductImage(productId, imageUrl) {
  const { error } = await supabase
    .from("products")
    .update({ image_url: imageUrl })
    .eq("id", productId)

  if (error) {
    throw error
  }
}

async function main() {
  const products = await getProductsFromDb()
  console.log(`Found ${products.length} products in database`)

  let uploaded = 0
  let skipped = 0
  let errors = 0

  for (const product of products) {
    const localPath = product.image_url?.startsWith("/")
      ? product.image_url
      : `/${product.image_url}`
    const filePath = path.join(PUBLIC_DIR, localPath || "")
    const filename = path.basename(filePath)

    if (!filename || !(await fileExists(filePath))) {
      console.log(`⚠️  Skipping ${product.name}: image not found at ${filePath}`)
      skipped++
      continue
    }

    try {
      const publicUrl = await uploadImage(filePath, filename)
      await updateProductImage(product.id, publicUrl)
      console.log(`✅ Uploaded ${filename} for ${product.name}`)
      uploaded++
    } catch (error) {
      console.error(`❌ Error uploading ${filename}:`, error.message)
      errors++
    }
  }

  console.log("\nDone!")
  console.log(`Uploaded: ${uploaded}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Errors: ${errors}`)
}

main()
