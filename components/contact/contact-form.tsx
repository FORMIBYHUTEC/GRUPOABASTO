"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

gsap.registerPlugin(ScrollTrigger)

export function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-field",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        },
      )
    }, formRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div ref={formRef} className="bg-card rounded-3xl border border-border p-8 md:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground">Mensaje enviado</h3>
        <p className="text-muted-foreground mb-8">
          Gracias por contactarnos. Nuestro equipo te responderá en menos de 24 horas.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
    <div ref={formRef} className="bg-card rounded-3xl border border-border p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-foreground">Solicita tu cotización</h2>
        <p className="text-muted-foreground">Completa el formulario y te contactaremos pronto.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-field space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Tu nombre"
              required
              className="rounded-xl bg-background border-border focus:border-primary"
            />
          </div>
          <div className="form-field space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              placeholder="Nombre de tu empresa"
              required
              className="rounded-xl bg-background border-border focus:border-primary"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-field space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@empresa.com"
              required
              className="rounded-xl bg-background border-border focus:border-primary"
            />
          </div>
          <div className="form-field space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+52 1 477 577 0084"
              required
              className="rounded-xl bg-background border-border focus:border-primary"
            />
          </div>
        </div>

        <div className="form-field space-y-2">
          <Label htmlFor="business-type">Tipo de negocio</Label>
          <Select>
            <SelectTrigger className="rounded-xl bg-background border-border focus:border-primary">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restaurant">Restaurante</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="factory">Fábrica</SelectItem>
              <SelectItem value="commerce">Comercio</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-field space-y-2">
          <Label htmlFor="products">Productos de interés</Label>
          <Select>
            <SelectTrigger className="rounded-xl bg-background border-border focus:border-primary">
              <SelectValue placeholder="¿Qué productos necesitas?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="insumos">Insumos Alimenticios</SelectItem>
              <SelectItem value="empaques">Empaques</SelectItem>
              <SelectItem value="limpieza">Productos de Limpieza</SelectItem>
              <SelectItem value="desechables">Desechables</SelectItem>
              <SelectItem value="varios">Varios / Todos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-field space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            placeholder="Cuéntanos sobre tus necesidades de abastecimiento..."
            rows={5}
            className="rounded-xl bg-background border-border focus:border-primary resize-none"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="form-field w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg gap-2 group"
        >
          Enviar solicitud
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </div>
  )
}
