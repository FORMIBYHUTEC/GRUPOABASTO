import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import dotenv from "dotenv"

// Load environment variables from .env.local
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

const content = fs.readFileSync("./components/products/products-data.ts", "utf-8")
const match = content.match(/export const products = (\[.*?\]);/s)
if (!match) {
  console.error("Could not parse products-data.ts")
  process.exit(1)
}

const products = eval(match[1])

async function seed() {
  const { error } = await supabase.from("products").insert(
    products.map((p) => ({
      name: p.name,
      description: p.description,
      category: p.category,
      image_url: p.image,
      is_active: true,
    }))
  )

  if (error) {
    console.error("Error seeding products:", error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${products.length} products`)
}

seed()
