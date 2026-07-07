"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
interface Product {
  id: string | number
  name: string
  description: string
  category: string
  image?: string | null
  image_url?: string | null
  price?: number | null
}

const categories = [
  { id: "all", name: "Todos" },
  { id: "limpieza-general", name: "Limpieza General" },
  { id: "utensilios", name: "Utensilios" },
  { id: "bolsas", name: "Bolsas" },
  { id: "papel", name: "Papel" },
  { id: "desechables", name: "Desechables" },
  { id: "vasos", name: "Vasos" },
  { id: "industrial", name: "Industrial" },
  { id: "papeleria", name: "Papelería" },
]

// Map homepage category slugs to their original category filters
const categorySlugMap: Record<string, string[]> = {
  animal: ["limpieza-general"],
  oficinas: ["limpieza-general", "utensilios", "papeleria"],
  alimentos: ["desechables", "vasos", "papel"],
  automotriz: ["limpieza-general", "industrial"],
  industrias: ["industrial", "bolsas", "papeleria", "papel"],
}

export function ProductsGrid({ products: rawProducts }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<{ id: string | number; name: string; qty: number; image?: string }[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [visibleCount, setVisibleCount] = useState(20)

  const products = useMemo(() => {
    return rawProducts.map((p) => ({
      ...p,
      image: p.image || p.image_url || "/placeholder.svg",
    }))
  }, [rawProducts])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('grupoAbastoCart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart from localStorage:', e)
      }
    }
  }, [])

  // Save cart to localStorage on every cart change
  useEffect(() => {
    localStorage.setItem('grupoAbastoCart', JSON.stringify(cart))
  }, [cart])

  // Listen for search query changes from ProductsHero
  useEffect(() => {
    const handleSearch = (event: CustomEvent<string>) => {
      setSearchQuery(event.detail)
    }
    window.addEventListener('productSearch' as any, handleSearch)
    return () => window.removeEventListener('productSearch' as any, handleSearch)
  }, [])

  // Read category from URL query param when arriving from category cards or when it changes
  useEffect(() => {
    const categoria = searchParams.get("categoria")
    if (categoria) {
      setActiveCategory(categoria)
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [searchParams])

  // Listen for remove from cart events
  useEffect(() => {
    const handleRemove = (event: CustomEvent<string | number>) => {
      setCart((prev) => prev.filter((item) => item.id !== event.detail))
    }
    window.addEventListener('removeFromCart' as any, handleRemove)
    return () => window.removeEventListener('removeFromCart' as any, handleRemove)
  }, [])

  useEffect(() => {
    const event = new CustomEvent('cartUpdated', { detail: cart })
    window.dispatchEvent(event)
  }, [cart])

  const filteredProducts = useMemo(() => {
    const activeCategories = activeCategory === "all" ? [] : (categorySlugMap[activeCategory] || [activeCategory])
    return products.filter((p) => {
      const matchesCategory = activeCategory === "all" || activeCategories.includes(p.category)
      const matchesSearch = searchQuery === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Reset visible count when category/search changes
  useEffect(() => {
    setVisibleCount(20)
  }, [activeCategory, searchQuery])

  const displayedProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  const addToCart = (productId: string | number) => {
    const item = products.find((p) => p.id === productId)
    if (!item) return
    setCart((prev) => {
      const existing = prev.find((p) => p.id === productId)
      if (existing) return prev.map((p) => (p.id === productId ? { ...p, qty: p.qty + 1 } : p))
      return [...prev, { id: item.id, name: item.name, qty: 1, image: item.image }]
    })
  }

  const whatsappLink = useMemo(() => {
    if (cart.length === 0) return "#"
    const lines = cart
      .map((item) => `• ${item.name} x${item.qty}`)
      .join("\n")
    const msg = `Pedido Grupo Abasto - León\n\nProductos:\n${lines}\n\nPor favor confirma tu pedido.`
    return `https://wa.me/524792939496?text=${encodeURIComponent(msg)}`
  }, [cart])

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        {/* Categories filter */}
        <div className="categories-bar flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === "all" && cat.id === "all" ||
              activeCategory === cat.id ||
              (categorySlugMap[activeCategory] || []).includes(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-btn px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "#163347",
                border: "1px solid rgba(58, 158, 69, 0.15)",
              }}
            >
              {/* Image */}
              <div
                className="relative aspect-square bg-white cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-4"
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2 mb-1">{product.name}</h3>
                <p className="text-xs text-white/50 line-clamp-1 mb-3 hidden sm:block">{product.description}</p>
                
                <Button
                  size="sm"
                  className="w-full bg-[#3a9e45] text-white hover:bg-[#2c7a35] rounded-xl text-xs sm:text-sm py-2 mt-auto"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    addToCart(product.id)
                  }}
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Agregar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="rounded-full px-8 py-5 text-sm font-medium border-[#3a9e45]/30 text-white hover:bg-[#3a9e45]/10"
              onClick={() => setVisibleCount((prev) => prev + 20)}
            >
              Cargar más productos ({filteredProducts.length - visibleCount} restantes)
            </Button>
          </div>
        )}

        {/* Cart info */}
        <div className="mt-8 rounded-2xl p-4 text-center" style={{ background: "rgba(58,158,69,0.08)", border: "1px solid rgba(58,158,69,0.15)" }}>
          <p className="text-white/60 text-xs sm:text-sm">
            Usa el menú inferior para ver tu carrito y hacer pedido por WhatsApp
          </p>
        </div>
      </div>

      {/* Product Modal Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-[#163347] border-[#3a9e45]/30">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row">
              {/* Image section - White background */}
              <div className="w-full md:w-1/2 bg-white relative aspect-square md:aspect-auto min-h-[300px]">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
              
              {/* Details section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between relative">
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #3a9e45 0%, transparent 70%)" }} />
                
                <div>
                  <DialogHeader className="mb-4 text-left">
                    <DialogTitle className="text-2xl font-bold text-white leading-tight">
                      {selectedProduct.name}
                    </DialogTitle>
                    <span className="inline-block mt-2 text-xs font-medium text-[#3a9e45] bg-[#3a9e45]/10 px-3 py-1 rounded-full border border-[#3a9e45]/20 w-fit">
                      {categories.find(c => c.id === selectedProduct.category)?.name || selectedProduct.category}
                    </span>
                  </DialogHeader>
                  <DialogDescription className="text-white/80 text-base mt-4 mb-6">
                    {selectedProduct.description}
                  </DialogDescription>
                </div>
                
                <div className="mt-8">
                  <Button
                    className="w-full bg-[#3a9e45] hover:bg-[#2c7a35] text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={() => {
                      addToCart(selectedProduct.id)
                      setSelectedProduct(null)
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
