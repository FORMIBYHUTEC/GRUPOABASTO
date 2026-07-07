"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Clock, Package, BadgeCheck } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Productos certificados y de las mejores marcas del mercado.",
  },
  {
    icon: Clock,
    title: "Pedidos Flexibles",
    description: "Sin mínimos de compra. Adapta tus órdenes según tus necesidades.",
  },
  {
    icon: Package,
    title: "Amplio Catálogo",
    description: "Más de 100 productos disponibles para tu negocio.",
  },
  {
    icon: BadgeCheck,
    title: "Precios Competitivos",
    description: "Los mejores precios del mercado con descuentos por volumen.",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4 block">
            Por qué elegirnos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            La diferencia
            <br />
            <span className="text-gradient">Grupo Abasto</span>
          </h2>
        </div>

        <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-card border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
