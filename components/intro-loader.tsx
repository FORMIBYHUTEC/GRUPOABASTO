"use client"

import { useEffect, useRef, useState } from "react"

const VIDEO_URL =
  "https://zufuqszbhgbddudrsvyo.supabase.co/storage/v1/object/sign/video/grok-video-8bfcfdc5-21e9-427a-9c54-2af424e0c246.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNTFkMjc1Mi1kNmM4LTQzODctYTlhZC1kMjBlZmVhNzJiMTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9ncm9rLXZpZGVvLThiZmNmZGM1LTIxZTktNDI3YS05YzU0LTJhZjQyNGUwYzI0Ni5tcDQiLCJpYXQiOjE3Nzg3MTg0NTEsImV4cCI6MTgxMDI1NDQ1MX0.eoEai4MfZk2j4v_g5E_VumgIaqGaQOF8BSz-RptRI0E"

const COOLDOWN_MS = 5 * 60 * 1000 // 5 minutos
const STORAGE_KEY = "ga_intro_last_shown"

export function IntroLoader() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Solo en dispositivos móviles (ancho < 768px)
    if (window.innerWidth >= 768) return

    const last = localStorage.getItem(STORAGE_KEY)
    const now = Date.now()

    if (!last || now - Number(last) >= COOLDOWN_MS) {
      setVisible(true)
      localStorage.setItem(STORAGE_KEY, String(now))
    }
  }, [])

  const dismiss = () => {
    setFadeOut(true)
    setTimeout(() => setVisible(false), 600)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video || !visible) return
    video.play().catch(() => {})
    video.addEventListener("ended", dismiss)
    return () => video.removeEventListener("ended", dismiss)
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        className="w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />
      {/* Botón para saltar */}
      <button
        onClick={dismiss}
        className="absolute bottom-8 right-8 text-white/70 text-sm hover:text-white transition-colors bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm"
      >
        Saltar →
      </button>
    </div>
  )
}
