"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 },
      )
    }
  }, [])

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          menuRef.current,
          { clipPath: "circle(0% at calc(100% - 40px) 40px)" },
          { clipPath: "circle(150% at calc(100% - 40px) 40px)", duration: 0.8, ease: "power3.inOut" },
        )
        gsap.fromTo(
          ".mobile-link",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.3 },
        )
      } else {
        gsap.to(menuRef.current, {
          clipPath: "circle(0% at calc(100% - 40px) 40px)",
          duration: 0.6,
          ease: "power3.inOut",
        })
      }
    }
  }, [isOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md border-b border-border py-3 shadow-sm" : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <Image src="/grupo-abasto-logo.png" alt="Grupo Abasto" width={180} height={70} className="h-14 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-300 text-sm font-semibold tracking-wide relative group ${scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? "bg-primary" : "bg-white"}`} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <MagneticButton>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-5 gap-2 group shadow-md hover:shadow-lg transition-all">
                Solicitar Cotización
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticButton>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background lg:hidden"
        style={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="mobile-link text-4xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button className="mobile-link bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg mt-4">
            Solicitar Cotización
          </Button>
        </div>
      </div>
    </>
  )
}
