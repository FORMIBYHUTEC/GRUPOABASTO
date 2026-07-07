"use client"

import { useState } from "react"
import { CRMLayout } from "@/components/crm/crm-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DEMO_LEADS, DEMO_QUOTES } from "@/lib/crm-data"
import { Quote, QuoteStatus, QuoteProduct } from "@/lib/types/crm"
import { Plus, Search, Calendar, DollarSign, FileText, Trash2 } from "lucide-react"

const statusColors: Record<QuoteStatus, string> = {
  enviada: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  aceptada: "bg-green-500/10 text-green-500 border-green-500/20",
  rechazada: "bg-red-500/10 text-red-500 border-red-500/20",
  pendiente: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
}

const statusLabels: Record<QuoteStatus, string> = {
  enviada: "Enviada",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  pendiente: "Pendiente",
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(DEMO_QUOTES)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false)
  const [quoteProducts, setQuoteProducts] = useState<QuoteProduct[]>([
    { producto: "", cantidad: 0, precioUnitario: 0, subtotal: 0 },
  ])

  const filteredQuotes = quotes.filter((quote) => {
    const lead = DEMO_LEADS.find((l) => l.id === quote.leadId)
    return (
      lead?.nombreNegocio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const addProduct = () => {
    setQuoteProducts([...quoteProducts, { producto: "", cantidad: 0, precioUnitario: 0, subtotal: 0 }])
  }

  const removeProduct = (index: number) => {
    setQuoteProducts(quoteProducts.filter((_, i) => i !== index))
  }

  const updateProduct = (index: number, field: keyof QuoteProduct, value: string | number) => {
    const updated = [...quoteProducts]
    updated[index] = { ...updated[index], [field]: value }
    if (field === "cantidad" || field === "precioUnitario") {
      updated[index].subtotal = updated[index].cantidad * updated[index].precioUnitario
    }
    setQuoteProducts(updated)
  }

  const calculateTotal = () => {
    return quoteProducts.reduce((sum, p) => sum + p.subtotal, 0)
  }

  const handleNewQuote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newQuote: Quote = {
      id: `Q${String(quotes.length + 1).padStart(3, "0")}`,
      leadId: formData.get("leadId") as string,
      fechaCotizacion: new Date(),
      productos: quoteProducts.filter((p) => p.producto && p.cantidad > 0),
      precioTotal: calculateTotal(),
      validezDias: Number(formData.get("validezDias")),
      estado: "pendiente",
      comentarios: formData.get("comentarios") as string,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setQuotes([newQuote, ...quotes])
    setIsNewQuoteOpen(false)
    setQuoteProducts([{ producto: "", cantidad: 0, precioUnitario: 0, subtotal: 0 }])
  }

  const handleUpdateStatus = (quoteId: string, newStatus: QuoteStatus) => {
    setQuotes(
      quotes.map((quote) =>
        quote.id === quoteId
          ? {
              ...quote,
              estado: newStatus,
              fechaRespuesta: newStatus !== "pendiente" && newStatus !== "enviada" ? new Date() : quote.fechaRespuesta,
              updatedAt: new Date(),
            }
          : quote,
      ),
    )
  }

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Cotizaciones</h2>
            <p className="text-muted-foreground mt-1">Gestiona las cotizaciones enviadas a clientes</p>
          </div>
          <Dialog open={isNewQuoteOpen} onOpenChange={setIsNewQuoteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cotización
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crear Nueva Cotización</DialogTitle>
                <DialogDescription>Genera una cotización para un lead</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewQuote} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leadId">Lead / Cliente *</Label>
                    <Select name="leadId" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un lead" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEMO_LEADS.map((lead) => (
                          <SelectItem key={lead.id} value={lead.id}>
                            {lead.nombreNegocio} - {lead.nombreContacto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validezDias">Validez (días) *</Label>
                    <Select name="validezDias" required defaultValue="15">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 días</SelectItem>
                        <SelectItem value="15">15 días</SelectItem>
                        <SelectItem value="30">30 días</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Productos / Servicios</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Producto
                    </Button>
                  </div>

                  {quoteProducts.map((product, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                          <div className="md:col-span-5 space-y-2">
                            <Label className="text-xs">Producto</Label>
                            <Input
                              value={product.producto}
                              onChange={(e) => updateProduct(index, "producto", e.target.value)}
                              placeholder="Nombre del producto"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label className="text-xs">Cantidad</Label>
                            <Input
                              type="number"
                              value={product.cantidad || ""}
                              onChange={(e) => updateProduct(index, "cantidad", Number(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label className="text-xs">Precio Unit.</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={product.precioUnitario || ""}
                              onChange={(e) => updateProduct(index, "precioUnitario", Number(e.target.value))}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label className="text-xs">Subtotal</Label>
                            <Input value={`$${product.subtotal.toFixed(2)}`} disabled />
                          </div>
                          <div className="md:col-span-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProduct(index)}
                              disabled={quoteProducts.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-foreground">${calculateTotal().toLocaleString("es-MX")}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comentarios">Comentarios / Condiciones</Label>
                  <Textarea id="comentarios" name="comentarios" rows={3} placeholder="Términos, condiciones, tiempos de entrega..." />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsNewQuoteOpen(false)
                      setQuoteProducts([{ producto: "", cantidad: 0, precioUnitario: 0, subtotal: 0 }])
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Crear Cotización</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID o nombre de cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredQuotes.map((quote) => {
            const lead = DEMO_LEADS.find((l) => l.id === quote.leadId)
            return (
              <Card key={quote.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-foreground">{quote.id}</h3>
                            <Badge className={statusColors[quote.estado]}>{statusLabels[quote.estado]}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{lead?.nombreNegocio}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(quote.fechaCotizacion).toLocaleDateString("es-MX", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>{quote.productos.length} productos</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold text-foreground">${quote.precioTotal.toLocaleString("es-MX")}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Válida por {quote.validezDias} días
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedQuote(quote)}>
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Cotización {quote.id}</DialogTitle>
                            <DialogDescription>{lead?.nombreNegocio}</DialogDescription>
                          </DialogHeader>
                          {selectedQuote && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs text-muted-foreground">Cliente</Label>
                                  <p className="text-sm font-medium">{lead?.nombreNegocio}</p>
                                  <p className="text-xs text-muted-foreground">{lead?.nombreContacto}</p>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Estado</Label>
                                  <div className="mt-1">
                                    <Select
                                      value={selectedQuote.estado}
                                      onValueChange={(value) => handleUpdateStatus(selectedQuote.id, value as QuoteStatus)}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pendiente">Pendiente</SelectItem>
                                        <SelectItem value="enviada">Enviada</SelectItem>
                                        <SelectItem value="aceptada">Aceptada</SelectItem>
                                        <SelectItem value="rechazada">Rechazada</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label className="text-xs text-muted-foreground mb-2 block">Productos Cotizados</Label>
                                <div className="space-y-2">
                                  {selectedQuote.productos.map((product, index) => (
                                    <Card key={index}>
                                      <CardContent className="p-3">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-sm font-medium">{product.producto}</p>
                                            <p className="text-xs text-muted-foreground">
                                              {product.cantidad} x ${product.precioUnitario.toFixed(2)}
                                            </p>
                                          </div>
                                          <p className="text-sm font-semibold">${product.subtotal.toLocaleString("es-MX")}</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                                <p className="font-semibold">Total</p>
                                <p className="text-2xl font-bold">${selectedQuote.precioTotal.toLocaleString("es-MX")}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs text-muted-foreground">Validez</Label>
                                  <p className="text-sm font-medium">{selectedQuote.validezDias} días</p>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Fecha de Cotización</Label>
                                  <p className="text-sm font-medium">
                                    {new Date(selectedQuote.fechaCotizacion).toLocaleDateString("es-MX")}
                                  </p>
                                </div>
                              </div>

                              {selectedQuote.fechaRespuesta && (
                                <div>
                                  <Label className="text-xs text-muted-foreground">Fecha de Respuesta</Label>
                                  <p className="text-sm font-medium">
                                    {new Date(selectedQuote.fechaRespuesta).toLocaleDateString("es-MX")}
                                  </p>
                                </div>
                              )}

                              {selectedQuote.comentarios && (
                                <div>
                                  <Label className="text-xs text-muted-foreground">Comentarios</Label>
                                  <p className="text-sm">{selectedQuote.comentarios}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Select value={quote.estado} onValueChange={(value) => handleUpdateStatus(quote.id, value as QuoteStatus)}>
                        <SelectTrigger className="w-full lg:w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="enviada">Enviada</SelectItem>
                          <SelectItem value="aceptada">Aceptada</SelectItem>
                          <SelectItem value="rechazada">Rechazada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {filteredQuotes.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No se encontraron cotizaciones</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CRMLayout>
  )
}
