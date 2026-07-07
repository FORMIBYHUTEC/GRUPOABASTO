import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  description: string
  category: string
  image_url: string | null
  price: number | null
  is_active: boolean
  created_at: string
}

export type Category = {
  id: string
  name: string
  color: string | null
  sort_order: number
}
