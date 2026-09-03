import { createClient } from "@supabase/supabase-js"
import fs from "fs"
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

async function main() {
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, description, category, image_url, price, is_active")
    .order("id")

  if (error) {
    console.error("Error fetching products:", error)
    process.exit(1)
  }

  const localProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description,
    image: p.image_url,
  }))

  const fileContent = `export const products = ${JSON.stringify(localProducts, null, 2)}\n`
  fs.writeFileSync("./components/products/products-data.ts", fileContent)

  console.log(`Updated products-data.ts with ${localProducts.length} products using Supabase image URLs`)
}

main()
