"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: "Insumo de Uso animal",
    description: "Productos especializados para el cuidado y mantenimiento animal",
    image: "/primera.png",
    href: "/productos?categoria=animal",
  },
  {
    title: "Insumo para escuelas, hogares y oficinas",
    description: "Materiales y productos esenciales para el día a día",
    image: "/segunda.png",
    href: "/productos?categoria=oficinas",
  },
  {
    title: "Insumos para comercios de alimentos",
    description: "Todo lo necesario para la industria alimentaria",
    image: "/tercera.png",
    href: "/productos?categoria=alimentos",
  },
  {
    title: "Insumos para uso automotriz",
    description: "Productos de limpieza y mantenimiento para el sector automotriz",
    image: "/cuarta.png",
    href: "/productos?categoria=automotriz",
  },
  {
    title: "Insumos para industrias",
    description: "Soluciones de limpieza y mantenimiento a nivel industrial",
    image: "/quinta.png",
    href: "/productos?categoria=industrias",
  },
]

export function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 60%",
          },
        },
      )

      // Cards stagger animation
      gsap.fromTo(
        ".category-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 md:w-80 md:h-80 bg-primary/5 rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-accent/5 rounded-full" />

      <div className="container mx-auto px-6 relative">
        <div ref={titleRef} className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4 block">
            Nuestros Productos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Todo lo que tu negocio
            <br />
            <span className="text-gradient">necesita</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Ofrecemos una amplia gama de productos de alta calidad para satisfacer las necesidades de tu empresa.
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="category-card group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] md:aspect-auto md:h-80 shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

              <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-background">{category.title}</h3>
                    <p className="text-background/90 text-sm md:text-base max-w-xs">{category.description}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl md:rounded-3xl group-hover:border-primary transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
