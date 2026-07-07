import { Button } from "@/components/ui/button"
import { ShieldCheck, Users, Clock } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    text: "Productos certificados",
  },
  {
    icon: Users,
    text: "Atención experta",
  },
  {
    icon: Clock,
    text: "Cumplimiento en tiempos de entrega",
  },
]

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg lg:h-full">
            <img src="/professional-warehouse-team-logistics.jpg" alt="Equipo de Grupo Abasto" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Experiencia, calidad y compromiso
            </h2>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              En Grupo Abasto nos especializamos en el suministro de materias primas de alta calidad para empresas.
              Sabemos que tu operación no puede detenerse, por eso ofrecemos productos confiables, entregas puntuales y
              atención profesional.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button size="lg" variant="outline">
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
