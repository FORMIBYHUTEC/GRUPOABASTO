import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Box, AlarmMinus as Aluminium, Grape as Wrap, Link2, Droplet } from "lucide-react"

const products = [
  {
    icon: ShoppingBag,
    title: "Bolsas Plásticas",
    description: "Diferentes tamaños y calibres para uso industrial y comercial.",
    image: "/plastic-bags-industrial-packaging.jpg",
  },
  {
    icon: Droplet,
    title: "Productos de Limpieza",
    description: "Detergentes, desinfectantes y artículos profesionales.",
    image: "/professional-cleaning-products-bottles.jpg",
  },
  {
    icon: Box,
    title: "Unicel",
    description: "Empaque, protección y aislamiento térmico.",
    image: "/styrofoam-packaging-materials.jpg",
  },
  {
    icon: Aluminium,
    title: "Aluminio",
    description: "Papel aluminio y bandejas desechables.",
    image: "/aluminum-foil-rolls-and-trays.jpg",
  },
  {
    icon: Wrap,
    title: "Emplaye",
    description: "Película stretch para almacén y transporte.",
    image: "/stretch-wrap-film-warehouse.jpg",
  },
  {
    icon: Link2,
    title: "Fleje y Accesorios",
    description: "Soluciones para asegurar y proteger cargas.",
    image: "/strapping-materials-cargo-securing.jpg",
  },
]

export function ProductsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Todo el abasto que tu negocio necesita
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Contamos con un amplio catálogo de materias primas y suministros para cubrir las necesidades de tu operación
            diaria.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.title} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <product.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{product.title}</CardTitle>
                <CardDescription className="text-base">{product.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent">
                  Ver productos
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg">Ver Catálogo Completo</Button>
        </div>
      </div>
    </section>
  )
}
