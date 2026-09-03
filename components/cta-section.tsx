"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"

gsap.registerPlugin(ScrollTrigger)

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-primary/5 rounded-full" />

      <div className="container mx-auto px-6 relative">
        <div className="cta-content max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm mb-6 md:mb-8">
            <span className="text-xs md:text-sm font-medium text-foreground">Comienza hoy mismo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight px-4">
            ¿Listo para optimizar
            <br />
            <span className="text-gradient">tu abastecimiento?</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            Únete a más de 100 empresas que confían en Grupo Abasto para sus operaciones diarias. Cotización
            personalizada en menos de 24 horas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <MagneticButton>
              <Link href="/contacto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg gap-2 group shadow-lg hover:shadow-xl transition-all"
                >
                  Solicitar Cotización Gratis
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/productos">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg border-2 border-foreground/20 hover:bg-card hover:border-primary/50 bg-card transition-all"
                >
                  Ver Catálogo Completo
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Trust badges */}
          <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 text-muted-foreground px-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs md:text-sm">Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs md:text-sm">Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs md:text-sm">Atención personalizada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
