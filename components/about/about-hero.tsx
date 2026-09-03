"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-text",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
      )
      gsap.fromTo(
        ".about-hero-image",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden bg-[#163347]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(58,158,69,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(30,77,107,0.6) 0%, transparent 70%)" }} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-repeat bg-center" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="about-hero-text">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3a9e45] animate-pulse" />
              <span className="text-white text-sm font-semibold tracking-widest uppercase">
                Nuestra Historia
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Construyendo
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a9e45] to-[#5abf65]">confianza</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-xl">
              Somos el aliado estratégico de más de 100 negocios, proveyendo materias primas de calidad
              con un servicio excepcional.
            </p>
          </div>

          <div className="about-hero-image relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image src="/about/warehouse-team.jpg" alt="Equipo Grupo Abasto" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#163347]/80 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-[#163347] border border-[#3a9e45]/30 rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-[#5abf65] mb-1">+2</div>
              <div className="text-sm text-white/80 font-medium">Años de experiencia</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background rounded-t-[100%] border-t border-[#3a9e45]/20 scale-x-110"></div>
    </section>
  )
}
