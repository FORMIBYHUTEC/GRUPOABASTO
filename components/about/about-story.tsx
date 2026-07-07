"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: "2023",
    title: "El inicio",
    description: "Fundamos Grupo Abasto con la visión de transformar el abastecimiento de materias primas en la región.",
  },
  {
    year: "2024",
    title: "Crecimiento rápido",
    description: "Ampliamos nuestro catálogo a más de 100 productos y consolidamos nuestras rutas de entrega.",
  },
  {
    year: "2025",
    title: "Consolidación",
    description: "Nos posicionamos como el aliado B2B de confianza para empresas en toda la región.",
  },
]

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Story text */}
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Nuestra Trayectoria
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Una historia de
              <br />
              <span className="text-gradient">compromiso</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Grupo Abasto nació de una simple pero poderosa idea: que cada negocio merece un proveedor confiable que
                entienda sus necesidades y las atienda con excelencia.
              </p>
              <p>
                A lo largo de los años, hemos construido relaciones duraderas con nuestros clientes basadas en la
                confianza, la calidad y el servicio personalizado.
              </p>
              <p>
                Hoy, seguimos innovando y creciendo, pero nuestra esencia permanece: ser el aliado que tu negocio
                necesita.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="timeline-container relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {timeline.map((item) => (
                <div key={item.year} className="timeline-item relative pl-12">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                  </div>
                  <div className="text-sm text-primary font-semibold mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
