"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const contactDetails = [
  {
    icon: Phone,
    title: "Teléfono",
    content: "+52 479 293 9496",
    href: "tel:+524792939496",
  },
  {
    icon: Mail,
    title: "Correo",
    content: "contacto@grupoabasto.com",
    href: "mailto:contacto@grupoabasto.com",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie: 8:00 - 18:00\nSáb: 9:00 - 14:00",
    href: null,
  },
]

export function ContactInfo() {
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-item",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
        },
      )
    }, infoRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={infoRef} className="space-y-6">
      {/* Contact cards */}
      <div className="space-y-4">
        {contactDetails.map((item) => (
          <div key={item.title} className="info-item">
            {item.href ? (
              <a
                href={item.href}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line text-sm">{item.content}</p>
                </div>
              </a>
            ) : (
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line text-sm">{item.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <div className="info-item">
        <a
          href="https://wa.me/524792939496"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300 group"
        >
          <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">WhatsApp Directo</h3>
            <p className="text-muted-foreground text-sm">Chatea con nosotros para una respuesta inmediata</p>
          </div>
        </a>
      </div>

    </div>
  )
}
