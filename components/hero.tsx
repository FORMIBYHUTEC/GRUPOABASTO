import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="absolute inset-0 bg-[url('/industrial-warehouse-with-organized-shelves-and-su.jpg')] bg-cover bg-center opacity-[0.03]" />

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Tu proveedor confiable de materias primas para tu negocio
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Todo lo que necesitas en un solo lugar: insumos, empaques y productos de limpieza con entregas rápidas y
            precios competitivos.
          </p>

          <div className="mt-8 grid gap-3 text-left sm:mx-auto sm:max-w-md">
            {[
              "Entrega rápida y confiable",
              "Precios especiales para empresas",
              "Amplio inventario disponible",
              "Atención personalizada",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm font-medium sm:text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base">
              Solicitar Cotización Gratis
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent">
              Ver Catálogo de Productos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
