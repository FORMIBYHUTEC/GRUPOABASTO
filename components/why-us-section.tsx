import { Truck, DollarSign, Package, Headphones } from "lucide-react"

const benefits = [
  {
    icon: Truck,
    title: "Entregas rápidas para que tu negocio no se detenga",
  },
  {
    icon: DollarSign,
    title: "Precios competitivos y descuentos por volumen",
  },
  {
    icon: Package,
    title: "Amplio inventario siempre disponible",
  },
  {
    icon: Headphones,
    title: "Asesoría personalizada según tu tipo de negocio",
  },
]

export function WhyUsSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Un socio estratégico para tu operación
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-center">
                <p className="text-lg font-medium leading-relaxed">{benefit.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
