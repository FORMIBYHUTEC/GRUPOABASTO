"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ProductsHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".products-hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Emit event when search query changes
  useEffect(() => {
    const event = new CustomEvent("productSearch", { detail: searchQuery })
    window.dispatchEvent(event)
  }, [searchQuery])

  return (
    <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden bg-[#163347]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(58,158,69,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(30,77,107,0.6) 0%, transparent 70%)" }} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-repeat bg-center" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="products-hero-content max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3a9e45] animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-widest uppercase">
              Nuestro Catálogo
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Productos para
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a9e45] to-[#5abf65]">tu negocio</span>
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Más de 120 productos de alta calidad para restaurantes, hoteles, fábricas y comercios, listos para entrega inmediata.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3a9e45] to-[#1e4d6b] rounded-full opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/10 border border-white/20 rounded-full p-1 flex items-center shadow-xl">
              <Search className="absolute left-6 w-5 h-5 text-white/50" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-6 text-lg rounded-full bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background rounded-t-[100%] border-t border-[#3a9e45]/20 scale-x-110"></div>
    </section>
  )
}
