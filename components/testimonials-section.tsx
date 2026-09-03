"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "María González",
    role: "Gerente de Compras",
    company: "Hotel Presidente",
    image: "/testimonial-person-3.png",
    quote:
      "Grupo Abasto transformó nuestra cadena de suministro. Las entregas puntuales y la calidad consistente nos permiten mantener los estándares que nuestros huéspedes esperan.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    role: "Chef Ejecutivo",
    company: "Restaurante El Jardín",
    image: "/professional-chef-man-portrait.jpg",
    quote:
      "La variedad de insumos y la frescura de los productos es incomparable. Son un socio estratégico para nuestro restaurante desde hace 5 años.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Directora de Operaciones",
    company: "Fábrica del Norte",
    image: "/operations-manager-woman.png",
    quote:
      "Los productos de limpieza industrial que nos proveen cumplen con todas las certificaciones. Excelente servicio y precios competitivos.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 md:w-[400px] md:h-[400px] bg-primary/5 rounded-full" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4 block">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Lo que dicen
              <br />
              <span className="text-gradient">nuestros clientes</span>
            </h2>
          </div>

          <div className="testimonial-content relative">
            <Quote className="absolute -top-4 md:-top-8 -left-2 md:-left-4 w-12 h-12 md:w-16 md:h-16 text-primary/20" />

            <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 border-2 border-border shadow-lg">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-base md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8 text-foreground/90">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    width={60}
                    height={60}
                    className="rounded-full w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                  />
                  <div>
                    <p className="font-bold text-foreground text-sm md:text-base">{testimonials[current].name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {testimonials[current].role} · {testimonials[current].company}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 self-end sm:self-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="rounded-full border-2 border-foreground/20 hover:bg-card hover:border-primary/50 bg-card"
                  >
                    <ChevronLeft className="w-4 md:w-5 h-4 md:h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="rounded-full border-2 border-foreground/20 hover:bg-card hover:border-primary/50 bg-card"
                  >
                    <ChevronRight className="w-4 md:w-5 h-4 md:h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6 md:mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
