"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"
import { ArrowRight, Package, ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Animated counter (pure React, no framer-motion)
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = target / 60
          const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(start))
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: 100, suffix: "+", label: "Productos", icon: Package },
  { value: 2,   suffix: "+", label: "Años",      icon: Star },
]

export function HeroPremium() {
  const containerRef = useRef<HTMLDivElement>(null)

  // GSAP entrance timeline — mobile-safe (no filter:blur, no rotateX)
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const bgEl = containerRef.current?.querySelector<HTMLElement>(".hero-bg-parallax")
    let rafId: number | null = null

    const updateParallax = () => {
      if (!bgEl || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const vh = window.innerHeight

      // Move only while hero is on screen to keep the motion subtle and performant
      if (rect.bottom > 0 && rect.top < vh) {
        const progress = (vh - rect.top) / (vh + rect.height)
        const offset = (progress - 0.5) * 70
        bgEl.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`
      }
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        updateParallax()
        rafId = null
      })
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
      tl.fromTo(".hero-logo",
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)" }
      )
      .fromTo(".hero-badge-pill",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, "-=0.3"
      )
      .fromTo(".hero-word",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }, "-=0.2"
      )
      .fromTo(".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, "-=0.2"
      )
      .fromTo(".hero-cta-btn",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.2"
      )
      .fromTo(".hero-stat",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 }, "-=0.1"
      )
      .fromTo(".hero-scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }, "-=0.1"
      )

      // Looping animations — only on desktop
      if (!isMobile) {
        gsap.to(".hero-logo-float", { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" })
        gsap.to(".hero-blob-1", { scale: 1.1, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" })
        gsap.to(".hero-blob-2", { scale: 1.06, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 })
        gsap.utils.toArray<HTMLElement>(".hero-particle").forEach((el, i) => {
          gsap.to(el, { y: -20 - (i % 3) * 8, opacity: 0.5, duration: 4 + (i % 3), repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i * 0.3) % 2 })
        })
      }
      gsap.to(".hero-scroll-hint", { y: 7, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 })
    }, containerRef)

    if (!isMobile) {
      updateParallax()
      window.addEventListener("scroll", onScroll, { passive: true })
      window.addEventListener("resize", onScroll)
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", onScroll)
      }
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      ctx.revert()
    }
  }, [])

  const particles = [
    { x: "8%",  y: "18%", size: 5, color: "rgba(58,158,69,0.7)" },
    { x: "85%", y: "12%", size: 3, color: "rgba(255,255,255,0.5)" },
    { x: "22%", y: "72%", size: 4, color: "rgba(90,191,101,0.6)" },
    { x: "70%", y: "68%", size: 6, color: "rgba(58,158,69,0.4)" },
    { x: "50%", y: "85%", size: 3, color: "rgba(255,255,255,0.4)" },
    { x: "92%", y: "45%", size: 5, color: "rgba(58,158,69,0.5)" },
    { x: "15%", y: "45%", size: 4, color: "rgba(255,255,255,0.3)" },
    { x: "60%", y: "22%", size: 3, color: "rgba(90,191,101,0.5)" },
    { x: "38%", y: "90%", size: 5, color: "rgba(22,51,71,0.6)" },
    { x: "78%", y: "82%", size: 3, color: "rgba(255,255,255,0.4)" },
  ]

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-24 px-4 sm:px-6"
      style={{ backgroundColor: "#091929" }}
    >
      <div
        className="hero-bg-parallax absolute -inset-8 pointer-events-none"
        style={{
          backgroundImage: "url('/fondo.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "translate3d(0,0,0) scale(1.08)",
          willChange: "transform",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(9,25,41,0.82) 0%, rgba(15,34,51,0.78) 35%, rgba(22,51,71,0.76) 70%, rgba(26,64,96,0.74) 100%)",
        }}
      />

      {/* === BACKGROUND ORBS (pure CSS/GSAP, zero framer-motion) === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hero-blob-1 absolute -top-32 -left-40 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] opacity-20 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(58,158,69,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="hero-blob-2 absolute -bottom-40 -right-32 w-[360px] h-[360px] sm:w-[560px] sm:h-[560px] opacity-15 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(26,64,96,0.7) 0%, rgba(58,158,69,0.2) 50%, transparent 70%)" }}
        />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(9,25,41,0.7) 100%)" }} />
      </div>

      {/* === PARTICLES (GSAP animated via class) === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color, opacity: 0.2 }}
          />
        ))}
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-16 sm:pt-20">

        {/* Logo */}
        <div className="hero-logo mb-6 relative">
          <div className="absolute inset-0 rounded-full opacity-25 hidden sm:block" style={{ background: "radial-gradient(circle, rgba(58,158,69,0.5) 0%, transparent 70%)", transform: "scale(1.5)" }} />
          <div className="hero-logo-float">
            <Image
              src="/grupo-abasto-logo.png"
              alt="Grupo Abasto"
              width={240}
              height={240}
              className="w-36 sm:w-48 md:w-56 h-auto object-contain relative z-10"
              priority
            />
          </div>
        </div>

        {/* Live badge */}
        <div className="hero-badge-pill inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
          style={{ background: "rgba(58,158,69,0.15)", border: "1px solid rgba(58,158,69,0.4)" }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#3a9e45" }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#5abf65" }} />
          </span>
          <span className="text-[13px] sm:text-sm font-semibold" style={{ color: "#7dd87f" }}>
            Proveedor líder en León, Guanajuato
          </span>
        </div>

        {/* Title */}
        <div className="mb-10" style={{ perspective: "800px" }}>
          <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-[1.05] tracking-tight">
            {["Abastece", "tu", "negocio", "con"].map((word) => (
              <span key={word} className="hero-word inline-block mr-[0.25em] last:mr-0 text-white">
                {word}
              </span>
            ))}
            {" "}
            {["Grupo", "Abasto"].map((word) => (
              <span
                key={word}
                className="hero-word inline-block mr-[0.25em] last:mr-0"
                style={{
                  background: "linear-gradient(135deg, #3a9e45 0%, #5abf65 40%, #a3f0a9 70%, #5abf65 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-2"
          style={{ color: "rgba(255,255,255,0.65)" }}>
          Bolsas, papelería sanitaria, desechables, empaques y más.{" "}
          <span style={{ color: "rgba(255,255,255,0.85)" }}>Precios competitivos y entrega directa</span> para tu negocio.
        </p>

        {/* CTA Buttons — framer-motion only for whileHover/whileTap (safe, no looping) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 w-full px-4 sm:px-0">
          <Link href="/contacto" className="w-full sm:w-auto hero-cta-btn">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="relative group overflow-hidden rounded-2xl w-full sm:w-auto">
              <Button size="lg"
                className="relative w-full sm:w-auto rounded-2xl px-7 py-6 text-base sm:text-lg font-bold text-white border-0 shadow-[0_8px_32px_rgba(58,158,69,0.5)]"
                style={{ background: "linear-gradient(135deg, #3a9e45 0%, #2c7a35 100%)" }}
              >
                <span className="flex items-center gap-2">
                  Solicitar Cotización Gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-2xl" />
              </Button>
            </motion.div>
          </Link>
          <Link href="/productos" className="w-full sm:w-auto hero-cta-btn">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Button size="lg" variant="outline"
                className="relative w-full sm:w-auto rounded-2xl px-7 py-6 text-base sm:text-lg font-bold text-white overflow-hidden group"
                style={{ border: "1.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}
              >
                Ver Catálogo
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-lg mx-auto px-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="hero-stat flex flex-col items-center gap-1.5 px-4 py-4 rounded-2xl relative overflow-hidden group cursor-default"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-0.5" style={{ background: "rgba(58,158,69,0.25)" }}>
                <stat.icon className="w-4 h-4" style={{ color: "#5abf65" }} />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white leading-none">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[11px] sm:text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Explorar</span>
        <ChevronDown className="w-5 h-5" style={{ color: "rgba(58,158,69,0.7)" }} />
      </div>
    </section>
  )
}
