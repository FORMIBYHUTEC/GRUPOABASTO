"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Menu, X, ShoppingBag, Phone, Info, Home, ShoppingCart, ChevronDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/", label: "Inicio", icon: Home, color: "#5abf65" },
  { href: "/productos", label: "Productos", icon: ShoppingBag, color: "#4da8d6" },
  { href: "/nosotros", label: "Nosotros", icon: Info, color: "#a78bfa" },
  { href: "/contacto", label: "Contacto", icon: Phone, color: "#fb923c" },
]

interface CartItem {
  id: string | number
  name: string
  qty: number
  image?: string
}

// Stagger container variants
const menuContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.03 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.015, staggerDirection: -1 },
  },
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  exit: {
    opacity: 0, x: 4,
    transition: { duration: 0.1, ease: "easeIn" },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.1, ease: "easeIn" } },
}

export function DynamicIslandMenu() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [justBounced, setJustBounced] = useState(false)

  // Escuchar eventos del carrito desde productos
  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      setCart(event.detail)
      // Micro-bounce the island when cart updates
      setJustBounced(true)
      setTimeout(() => setJustBounced(false), 600)
    }
    window.addEventListener("cartUpdated" as any, handleCartUpdate)
    return () => window.removeEventListener("cartUpdated" as any, handleCartUpdate)
  }, [])

  // Cerrar carrito al cerrar el menú
  useEffect(() => {
    if (!isExpanded) setShowCart(false)
  }, [isExpanded])

  // Close on outside click
  useEffect(() => {
    if (!isExpanded) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-island]")) setIsExpanded(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [isExpanded])

  const removeFromCart = (productId: string | number) => {
    const event = new CustomEvent('removeFromCart', { detail: productId })
    window.dispatchEvent(event)
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <motion.nav
      className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Glow ring - simplified for mobile performance */}
      <AnimatePresence>
        {totalItems > 0 && !isExpanded && (
          <motion.div
            key="glow-ring"
            className="absolute inset-0 rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: "transparent", boxShadow: "0 0 0 2px rgba(58,158,69,0.5), 0 0 16px rgba(58,158,69,0.3)" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        data-island
        animate={{
          width: isExpanded ? "min(92vw, 380px)" : "auto",
          borderRadius: isExpanded ? "24px" : "9999px",
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative overflow-hidden"
        onClick={() => !isExpanded && setIsExpanded(true)}
        whileHover={!isExpanded ? { scale: 1.04, y: -2 } : {}}
        whileTap={!isExpanded ? { scale: 0.96 } : {}}
        style={{
          background: isExpanded
            ? "linear-gradient(165deg, #122a3e 0%, #0e2234 100%)"
            : "#163347",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          cursor: !isExpanded ? "pointer" : "default",
        } as any}
      >
        {/* Subtle top border shine */}
        <div className="absolute top-0 left-0 right-0 h-[1px] opacity-30"
          style={{ background: "linear-gradient(90deg, transparent, rgba(58,158,69,0.8) 40%, rgba(90,191,101,0.6) 60%, transparent)" }} />

        <AnimatePresence initial={false}>
          {/* ─── COLLAPSED PILL ─── */}
          {!isExpanded ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="px-5 py-3 flex items-center gap-3.5 whitespace-nowrap"
            >
              {/* Animated menu icon */}
              <motion.div
                animate={justBounced ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Menu className="w-[18px] h-[18px] text-white/90" />
              </motion.div>

              <span className="text-white/90 text-sm font-semibold tracking-wide">Explorar Menú</span>

              <div className="w-px h-4 bg-white/15 mx-0.5" />

              {/* Cart button */}
              <motion.div
                className="relative flex items-center justify-center rounded-full w-8 h-8"
                style={{ background: totalItems > 0 ? "rgba(58,158,69,0.3)" : "rgba(255,255,255,0.1)" }}
                whileHover={{ scale: 1.15, background: "rgba(58,158,69,0.5)" }}
                animate={justBounced ? { scale: 1.3 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <ShoppingCart className="w-[15px] h-[15px] text-white" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0, rotate: -45, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 45, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 600, damping: 15 }}
                      className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 text-[10px] font-black rounded-full flex items-center justify-center text-white shadow-lg"
                      style={{ background: "#3a9e45", minWidth: "18px", minHeight: "18px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (

            /* ─── EXPANDED PANEL ─── */
            <motion.div
              key="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4 sm:p-5"
            >
              {/* Header */}
              <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex items-center justify-between mb-5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm">
                    <Image
                      src="/grupo-abasto-logo.png"
                      alt="Grupo Abasto"
                      width={100}
                      height={32}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(false) }}
                  className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  whileHover={{ scale: 1.12, background: "rgba(255,80,80,0.25)" }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                >
                  <X className="w-[18px] h-[18px] text-white/90" />
                </motion.button>
              </motion.div>

              {/* Nav links */}
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-1.5"
              >
                {menuItems.map((item, index) => (
                  <motion.div key={item.href} variants={menuItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsExpanded(false)}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl group relative overflow-hidden transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      {/* hover bg */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: `linear-gradient(135deg, ${item.color}14, ${item.color}08)` }}
                      />
                      {/* shine sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out" />

                      <motion.div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 relative z-10 transition-all duration-300"
                        style={{ background: `${item.color}20` }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <item.icon className="w-[17px] h-[17px]" style={{ color: item.color }} />
                      </motion.div>
                      <span className="text-white/85 text-[15px] font-medium group-hover:text-white transition-colors relative z-10">
                        {item.label}
                      </span>
                      {/* right arrow */}
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity relative z-10"
                        initial={false}
                        animate={{}}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Cart section */}
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 5 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-white/8">
                      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(58,158,69,0.1)", border: "1px solid rgba(58,158,69,0.2)" }}>
                        <button
                          onClick={() => setShowCart(!showCart)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
                              style={{ background: "linear-gradient(135deg, #5abf65, #3a9e45)" }}>
                              <ShoppingCart className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="text-[#7dd87f] font-bold text-sm leading-none mb-0.5">Tu Carrito</div>
                              <div className="text-white/50 text-xs">{totalItems} {totalItems === 1 ? "producto" : "productos"}</div>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: showCart ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 22 }}
                            className="rounded-full p-1"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                          >
                            <ChevronDown className="w-4 h-4 text-white/70" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {showCart && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 360, damping: 30 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 pb-3 pt-1 space-y-1.5 max-h-[200px] overflow-y-auto"
                                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(58,158,69,0.3) transparent" }}>
                                {cart.map((item, i) => (
                                  <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 24 }}
                                    className="flex items-center gap-2.5 text-sm px-2.5 py-2 rounded-xl group relative"
                                    style={{ background: "rgba(255,255,255,0.05)" }}
                                  >
                                    {item.image && (
                                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/10">
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          width={40}
                                          height={40}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}
                                    <span className="text-white/85 truncate flex-1 font-medium text-[13px]">{item.name}</span>
                                    <span className="font-black text-[#163347] text-[11px] px-2 py-0.5 rounded-lg shrink-0"
                                      style={{ background: "#5abf65" }}>×{item.qty}</span>
                                    <motion.button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        removeFromCart(item.id)
                                      }}
                                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                      style={{ background: "rgba(239,68,68,0.2)" }}
                                      whileHover={{ scale: 1.1, background: "rgba(239,68,68,0.3)" }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                    </motion.button>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-3"
                      >
                        <Button
                          className="w-full text-white rounded-xl py-5 font-bold text-[15px] relative overflow-hidden group border-0"
                          style={{ background: "linear-gradient(135deg, #3a9e45 0%, #2c7a35 100%)", boxShadow: "0 6px 24px rgba(58,158,69,0.45)" }}
                          onClick={() => {
                            const lines = cart.map((item) => `• ${item.name} x${item.qty}`).join("\n")
                            const msg = `Pedido Grupo Abasto - León\n\nProductos:\n${lines}\n\nPor favor confirma tu pedido.`
                            window.open(`https://wa.me/524792939496?text=${encodeURIComponent(msg)}`, "_blank")
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                          <span className="relative z-10">Hacer pedido por WhatsApp</span>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}
