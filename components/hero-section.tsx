"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { Hero3D } from "@/components/hero-3d"
import { TextReveal } from "@/components/text-reveal"
import Link from "next/link"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      gsap.fromTo(
        ".stat-number",
        { textContent: 0 },
        {
          textContent: (i: number, el: Element) => el.getAttribute("data-value") || "0",
          duration: 2,
          ease: "power2.out",
          delay: 1.5,
          snap: { textContent: 1 },
        },
      )

      gsap.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 })

      gsap.fromTo(
        ".hero-stats",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.2 },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      <Hero3D />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-transparent to-background/70 z-10" />

      <div className="container mx-auto px-6 relative z-20 pt-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm mb-6 md:mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-foreground">Tu aliado en abastecimiento</span>
          </div>

          {/* Main headline with text reveal */}
          <TextReveal delay={0.5}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] md:leading-[0.95] tracking-tight mb-4 md:mb-6">
              Materias primas
              <br />
              <span className="text-gradient">para tu negocio</span>
            </h1>
          </TextReveal>

          <TextReveal delay={0.7}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-8 md:mb-10 leading-relaxed">
              Insumos, empaques y productos de limpieza con entregas rápidas y precios competitivos para restaurantes,
              hoteles y fábricas.
            </p>
          </TextReveal>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row flex-wrap items-center gap-3 md:gap-4 mb-12 md:mb-16">
            <MagneticButton>
              <Link href="/contacto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg gap-2 group shadow-lg hover:shadow-xl transition-all"
                >
                  Solicitar Cotización
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/productos">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg gap-2 border-2 border-foreground/20 hover:bg-card hover:border-primary/50 bg-card transition-all"
                >
                  <Play className="w-4 md:w-5 h-4 md:h-5" />
                  Ver Productos
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="hero-stats grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-xl">
            <div className="text-center md:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
                +<span className="stat-number" data-value="100">
                  0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Productos</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
                +<span className="stat-number" data-value="2">
                  0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Años de experiencia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
