import type { Metadata } from "next"
import { Suspense } from "react"
import { FooterPremium } from "@/components/footer-premium"
import { DynamicIslandMenuWrapper } from "@/components/dynamic-island-menu-wrapper"
import { ProductsHero } from "@/components/products/products-hero"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductsCta } from "@/components/products/products-cta"
import { ProductsShowcase } from "@/components/products-showcase"
import { supabase } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Productos | Grupo Abasto",
  description: "Catálogo de productos de limpieza, empaques, papelería y más para tu negocio.",
}

export default async function ProductosPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error loading products:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <DynamicIslandMenuWrapper />
      <ProductsHero />
      <ProductsShowcase />
      <Suspense fallback={<div className="py-20 text-center">Cargando productos...</div>}>
        <ProductsGrid products={products || []} />
      </Suspense>
      <ProductsCta />
      <FooterPremium />
    </main>
  )
}
