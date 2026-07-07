"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: "Insumo de Uso animal",
    description: "Productos especializados para el cuidado y mantenimiento animal",
    color: "#3a9e45",
    image: "/primera.png",
    href: "/productos?categoria=animal",
  },
  {
    title: "Insumo para escuelas, hogares y oficinas",
    description: "Materiales y productos esenciales para el día a día",
    color: "#2a7abf",
    image: "/segunda.png",
    href: "/productos?categoria=oficinas",
  },
  {
    title: "Insumos para comercios de alimentos",
    description: "Todo lo necesario para la industria alimentaria",
    color: "#1a8c7a",
    image: "/tercera.png",
    href: "/productos?categoria=alimentos",
  },
  {
    title: "Insumos para uso automotriz",
    description: "Productos de limpieza y mantenimiento para el sector automotriz",
    color: "#7a5abf",
    image: "/cuarta.png",
    href: "/productos?categoria=automotriz",
  },
  {
    title: "Insumos para industrias",
    description: "Soluciones de limpieza y mantenimiento a nivel industrial",
    color: "#0e7490",
    image: "/quinta.png",
    href: "/productos?categoria=industrias",
  },
]

export function ProductsShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5" style={{ background: "radial-gradient(circle, rgba(22,51,71,0.4) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, rgba(58,158,69,0.4) 0%, transparent 70%)" }} />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(22,51,71,0.08)", border: "1px solid rgba(22,51,71,0.15)" }}>
            <span className="text-sm font-bold" style={{ color: "#163347" }}>Nuestros Productos</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Todo lo que necesitas
            <br />
            <span className="text-gradient">en un solo lugar</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="product-card group flex flex-col gap-5 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-border/40 group-hover:shadow-xl group-hover:border-primary/20 transition-all duration-500">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="px-2">
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: "#3A9E4515" }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: "#3A9E45" }} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/productos">
            <Button 
              size="lg"
              className="rounded-2xl px-8 py-6 text-lg font-semibold hover:scale-105 transition-all text-white"
              style={{ background: "#163347" }}
            >
              Ver Catálogo Completo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
