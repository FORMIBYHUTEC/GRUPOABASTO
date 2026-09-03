"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function ContactHero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-content",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden bg-[#163347]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(58,158,69,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(30,77,107,0.6) 0%, transparent 70%)" }} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-repeat bg-center" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="contact-hero-content max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3a9e45] animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-widest uppercase">
              Contáctanos
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Hablemos de tu
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a9e45] to-[#5abf65]">negocio</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Estamos listos para ayudarte. Solicita tu cotización o resuelve tus dudas con nuestro equipo de atención personalizada.
          </p>
        </div>
      </div>
      
      {/* Curved bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background rounded-t-[100%] border-t border-[#3a9e45]/20 scale-x-110"></div>
    </section>
  )
}
