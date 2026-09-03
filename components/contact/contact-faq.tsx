"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "¿Cuál es el pedido mínimo?",
    answer:
      "No tenemos pedido mínimo. Nos adaptamos a las necesidades de tu negocio, ya sea que necesites pequeñas cantidades o grandes volúmenes.",
  },
  {
    question: "¿Cuánto tiempo tardan en entregar?",
    answer:
      "Nuestro tiempo de entrega estándar es de 24 horas para la zona metropolitana. Para otras regiones, el tiempo puede variar entre 24-48 horas dependiendo de la ubicación.",
  },
  {
    question: "¿Ofrecen crédito a empresas?",
    answer:
      "Sí, ofrecemos líneas de crédito a empresas con historial comprobable. El proceso de evaluación toma aproximadamente 5 días hábiles.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Puedes solicitar una cotización a través de nuestro formulario de contacto, por WhatsApp o llamando directamente a nuestro equipo de ventas. Te responderemos en menos de 24 horas.",
  },
  {
    question: "¿Tienen garantía en sus productos?",
    answer:
      "Todos nuestros productos cuentan con garantía de calidad. Si algún producto no cumple con tus expectativas, lo reemplazamos sin costo adicional.",
  },
  {
    question: "¿Puedo programar entregas recurrentes?",
    answer:
      "Sí, ofrecemos planes de entrega programada semanal, quincenal o mensual. Esto te permite asegurar tu abastecimiento y obtener mejores precios.",
  },
]

export function ContactFaq() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-title",
        { y: 50, opacity: 0 },
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
      gsap.fromTo(
        ".faq-accordion",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
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
    <section ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="faq-title text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Tienes <span className="text-gradient">dudas</span>?
            </h2>
          </div>

          <div className="faq-accordion">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
