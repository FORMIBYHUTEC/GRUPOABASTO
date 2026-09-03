import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const sourceDir = process.argv[2] || "/private/tmp/catalogo-con-precios-1"
const bucket = "product-images"
const destinationPrefix = process.argv[3] || "catalogo-con-precios-1"

if (!supabaseUrl || !serviceKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const files = (await fs.promises.readdir(sourceDir))
  .filter((filename) => /\.(png|webp)$/i.test(filename))
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))

if (files.length !== 91) {
  throw new Error(`Expected 91 extracted PNGs in ${sourceDir}; found ${files.length}`)
}

for (const filename of files) {
  const file = await fs.promises.readFile(path.join(sourceDir, filename))
  const contentType = filename.toLowerCase().endsWith(".webp") ? "image/webp" : "image/png"
  const { error } = await supabase.storage
    .from(bucket)
    .upload(`${destinationPrefix}/${filename}`, file, {
      cacheControl: "3600",
      contentType,
      upsert: true,
    })
  if (error) throw new Error(`${filename}: ${error.message}`)
  console.log(`Uploaded ${filename}`)
}

console.log(`Uploaded ${files.length} catalog images to ${bucket}/${destinationPrefix}`)
