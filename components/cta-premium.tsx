"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function CtaPremium() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0f2233 0%, #163347 55%, #1a4060 100%)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(58,158,69,0.12) 0%, transparent 60%)" }} />
      
      <div className="container mx-auto relative z-10">
        <div className="cta-content max-w-5xl mx-auto">
          <div className="rounded-[3rem] p-8 md:p-12 lg:p-16" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                ¿Listo para empezar?
                <br />
                <span style={{ background: "linear-gradient(135deg, #3a9e45, #5abf65)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Cotiza sin compromiso</span>
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
                Contáctanos y recibe una cotización personalizada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/contacto">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto text-white rounded-2xl px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all"
                  style={{ background: "#3a9e45" }}
                >
                  Solicitar Cotización Gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="tel:+524792939496">
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-2xl px-10 py-7 text-lg font-semibold hover:scale-105 transition-all text-white"
                  style={{ border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)" }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#163347" }}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Teléfono</p>
                  <p className="font-semibold text-sm text-white">+52 1 477 577 0084</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#3a9e45" }}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Email</p>
                  <p className="font-semibold text-sm text-white">contacto@grupoabasto.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#163347" }}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Ubicación</p>
                  <p className="font-semibold text-sm text-white">León, México</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
