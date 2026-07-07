import { Package, ShieldCheck } from "lucide-react"

const stats = [
  {
    icon: Package,
    value: "+100",
    label: "productos disponibles",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "calidad garantizada",
  },
]

export function TrustSection() {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-balance text-center text-lg text-muted-foreground sm:text-xl">
          Más de 100 empresas confían en Grupo Abasto para mantener su operación sin interrupciones.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
