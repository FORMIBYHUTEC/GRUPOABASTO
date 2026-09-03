"use client"

import { useEffect, type ReactNode } from "react"

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Lenis-like smooth scroll behavior with native API
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // Don't interfere with zoom
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  return <>{children}</>
}
