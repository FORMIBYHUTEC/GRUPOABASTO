"use client"

import type React from "react"

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
}

export function MagneticButton({ children, strength = 0.3 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })
  }

  return (
    <div ref={buttonRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="inline-block">
      {children}
    </div>
  )
}
