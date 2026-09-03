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
    { name: "CRM", href: "/crm/login" },
  ],
  productos: [
    { name: "Limpieza General", href: "/productos#limpieza-general" },
    { name: "Bolsas y Empaque", href: "/productos#bolsas" },
    { name: "Desechables", href: "/productos#desechables" },
    { name: "Vasos", href: "/productos#vasos" },
    { name: "Papelería", href: "/productos#papeleria" },
  ],
  legal: [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
  ],
}

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
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
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-card/80 border-t-2 border-border">
      <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="footer-col lg:col-span-1">
            <Image src="/logo-new.png" alt="Grupo Abasto" width={160} height={60} className="h-12 md:h-14 w-auto mb-4 md:mb-6" />
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              Tu aliado estratégico en abastecimiento de materias primas para negocios.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="font-bold text-foreground mb-4 md:mb-6 text-sm md:text-base">Empresa</h4>
            <ul className="space-y-3 md:space-y-4">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h4 className="font-bold text-foreground mb-4 md:mb-6 text-sm md:text-base">Productos</h4>
            <ul className="space-y-3 md:space-y-4">
              {navigation.productos.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="font-bold text-foreground mb-4 md:mb-6 text-sm md:text-base">Contacto</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 md:w-5 h-4 md:h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm md:text-base text-muted-foreground">Ciudad de México, México</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 md:w-5 h-4 md:h-5 text-primary shrink-0" />
                <a href="tel:+524792939496" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  +52 479 293 9496
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 md:w-5 h-4 md:h-5 text-primary shrink-0" />
                <a
                  href="mailto:contacto@grupoabasto.com"
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  contacto@grupoabasto.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">© 2025 Grupo Abasto. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
