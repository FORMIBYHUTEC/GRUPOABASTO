"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const navigation = {
  empresa: [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Productos", href: "/productos" },
    { name: "Contacto", href: "/contacto" },
  ],
  productos: [
    { name: "Limpieza General", href: "/productos#limpieza-general" },
    { name: "Utensilios de Limpieza", href: "/productos#utensilios" },
    { name: "Bolsas y Empaque", href: "/productos#bolsas" },
    { name: "Desechables", href: "/productos#desechables" },
    { name: "Papel y Servilletas", href: "/productos#papel" },
    { name: "Vasos", href: "/productos#vasos" },
    { name: "Industrial", href: "/productos#industrial" },
    { name: "Papelería", href: "/productos#papeleria" },
  ],
}

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function FooterPremium() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/20" />
      
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="footer-col lg:col-span-1">
            <div className="neomorphic rounded-3xl p-6">
              <Image 
                src="/grupo-abasto-logo.png" 
                alt="Grupo Abasto" 
                width={160} 
                height={60} 
                className="h-16 w-auto mb-4 object-contain" 
              />
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Tu aliado estratégico en abastecimiento de materias primas.
              </p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-11 h-11 rounded-xl neomorphic-inset flex items-center justify-center hover:scale-110 transition-transform group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <div className="glass rounded-3xl p-6">
              <h4 className="font-bold text-foreground mb-4 text-sm">Empresa</h4>
              <ul className="space-y-3">
                {navigation.empresa.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Products */}
          <div className="footer-col">
            <div className="glass rounded-3xl p-6">
              <h4 className="font-bold text-foreground mb-4 text-sm">Productos</h4>
              <ul className="space-y-3">
                {navigation.productos.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="glass rounded-3xl p-6">
              <h4 className="font-bold text-foreground mb-4 text-sm">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">León, México</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <a href="tel:+524792939496" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    +52 479 293 9496
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <a
                    href="mailto:contacto@grupoabasto.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    contacto@grupoabasto.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="glass-strong rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © 2025 Grupo Abasto. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
