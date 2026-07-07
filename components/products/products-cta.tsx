"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"

gsap.registerPlugin(ScrollTrigger)

export function ProductsCta() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".products-cta-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
    <section ref={sectionRef} className="py-20" style={{ background: "linear-gradient(135deg, #0f2233 0%, #163347 100%)" }}>
      <div className="container mx-auto px-6">
        <div className="products-cta-content max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <FileText className="w-4 h-4" style={{ color: "#3a9e45" }} />
            <span className="text-sm text-white">Catálogo completo disponible</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">¿No encuentras lo que buscas?</h2>
          <p className="mb-10 max-w-2xl mx-auto text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            Contamos con más de 2,000 productos en nuestro catálogo. Contáctanos y te ayudamos a encontrar exactamente
            lo que necesitas para tu negocio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link href="/contacto">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg gap-2 group text-white"
                  style={{ background: "#3a9e45" }}
                >
                  Solicitar Cotización
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg text-white hover:scale-105 transition-all"
                style={{ border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)" }}
              >
                Descargar Catálogo PDF
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
