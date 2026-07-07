import { createClient } from "@supabase/supabase-js"
import { Product } from "./supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}

export async function createProduct(product: Omit<Product, "id" | "created_at">): Promise<Product> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert(product)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", id)

  if (error) throw error
}

export async function uploadProductImage(file: File, filename: string): Promise<string> {
  const { data, error } = await supabaseAdmin.storage
    .from("product-images")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: true,
    })

  if (error) throw error

  const { data: publicUrl } = supabaseAdmin.storage
    .from("product-images")
    .getPublicUrl(data.path)

  return publicUrl.publicUrl
}
