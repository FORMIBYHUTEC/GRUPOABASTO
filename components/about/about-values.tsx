"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart, Target, Users, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Heart,
    title: "Compromiso",
    description: "Nos dedicamos al éxito de nuestros clientes como si fuera el nuestro propio.",
  },
  {
    icon: Target,
    title: "Excelencia",
    description: "Buscamos la perfección en cada entrega, cada producto y cada interacción.",
  },
  {
    icon: Users,
    title: "Cercanía",
    description: "Construimos relaciones personales y duraderas con cada uno de nuestros clientes.",
  },
  {
    icon: Zap,
    title: "Innovación",
    description: "Adoptamos tecnología y procesos que nos permiten servir mejor cada día.",
  },
]

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-card",
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 75%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Nuestros Valores
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Lo que nos
            <br />
            <span className="text-gradient">define</span>
          </h2>
        </div>

        <div className="values-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="value-card group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <value.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
