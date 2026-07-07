import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image src="/grupo-abasto-logo.png" alt="Grupo Abasto" width={170} height={65} className="h-14 w-auto object-contain" priority />
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#productos" className="text-sm font-medium transition-colors hover:text-primary">
              Productos
            </a>
            <a href="#nosotros" className="text-sm font-medium transition-colors hover:text-primary">
              Nosotros
            </a>
            <a href="#contacto" className="text-sm font-medium transition-colors hover:text-primary">
              Contacto
            </a>
            <Button size="sm">Solicitar Cotización</Button>
          </div>

          <Button size="sm" className="md:hidden">
            Cotización
          </Button>
        </div>
      </div>
    </nav>
  )
}
