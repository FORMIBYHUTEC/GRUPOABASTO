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
import { DEMO_LEADS } from "@/lib/crm-data"
import { Lead, LeadStatus, LeadSource } from "@/lib/types/crm"
import { Plus, Search, Phone, Mail, Calendar, Package, Filter } from "lucide-react"

const statusColors: Record<LeadStatus, string> = {
  nuevo: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  contactado: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  cotizado: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  ganado: "bg-green-500/10 text-green-500 border-green-500/20",
  perdido: "bg-red-500/10 text-red-500 border-red-500/20",
}

const statusLabels: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cotizado: "Cotizado",
  ganado: "Ganado",
  perdido: "Perdido",
}

const sourceLabels: Record<LeadSource, string> = {
  web: "Sitio Web",
  meta_ads: "Meta Ads",
  google_ads: "Google Ads",
  whatsapp: "WhatsApp",
  referido: "Referido",
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false)

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nombreNegocio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.nombreContacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || lead.estado === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleNewLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newLead: Lead = {
      id: `L${String(leads.length + 1).padStart(3, "0")}`,
      nombreNegocio: formData.get("nombreNegocio") as string,
      nombreContacto: formData.get("nombreContacto") as string,
      email: formData.get("email") as string,
      telefono: formData.get("telefono") as string,
      origen: formData.get("origen") as LeadSource,
      fechaContacto: new Date(),
      productoInteres: formData.get("productoInteres") as string,
      cantidadSolicitada: formData.get("cantidadSolicitada") as string,
      notas: formData.get("notas") as string,
      estado: "nuevo",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setLeads([newLead, ...leads])
    setIsNewLeadOpen(false)
  }

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, estado: newStatus, updatedAt: new Date() } : lead,
      ),
    )
    if (selectedLead?.id === leadId) {
      setSelectedLead({ ...selectedLead, estado: newStatus, updatedAt: new Date() })
    }
  }

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Gestión de Leads</h2>
            <p className="text-muted-foreground mt-1">Administra y da seguimiento a tus contactos</p>
          </div>
          <Dialog open={isNewLeadOpen} onOpenChange={setIsNewLeadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Lead</DialogTitle>
                <DialogDescription>Ingresa la información del nuevo contacto</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewLead} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombreNegocio">Nombre del Negocio *</Label>
                    <Input id="nombreNegocio" name="nombreNegocio" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nombreContacto">Nombre del Contacto *</Label>
                    <Input id="nombreContacto" name="nombreContacto" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input id="telefono" name="telefono" type="tel" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origen">Origen *</Label>
                  <Select name="origen" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el origen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Sitio Web</SelectItem>
                      <SelectItem value="meta_ads">Meta Ads</SelectItem>
                      <SelectItem value="google_ads">Google Ads</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="referido">Referido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productoInteres">Producto de Interés *</Label>
                  <Input id="productoInteres" name="productoInteres" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidadSolicitada">Cantidad Solicitada</Label>
                  <Input id="cantidadSolicitada" name="cantidadSolicitada" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notas">Notas / Requerimientos</Label>
                  <Textarea id="notas" name="notas" rows={3} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsNewLeadOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Crear Lead</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as LeadStatus | "all")}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="nuevo">Nuevos</SelectItem>
                  <SelectItem value="contactado">Contactados</SelectItem>
                  <SelectItem value="cotizado">Cotizados</SelectItem>
                  <SelectItem value="ganado">Ganados</SelectItem>
                  <SelectItem value="perdido">Perdidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{lead.nombreNegocio}</h3>
                        <p className="text-sm text-muted-foreground">{lead.nombreContacto}</p>
                      </div>
                      <Badge className={statusColors[lead.estado]}>{statusLabels[lead.estado]}</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{lead.telefono}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(lead.fechaContacto).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span className="truncate">{lead.productoInteres}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {sourceLabels[lead.origen]}
                      </Badge>
                      {lead.cantidadSolicitada && (
                        <Badge variant="outline" className="text-xs">
                          {lead.cantidadSolicitada}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                          Ver Detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{lead.nombreNegocio}</DialogTitle>
                          <DialogDescription>Información completa del lead</DialogDescription>
                        </DialogHeader>
                        {selectedLead && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs text-muted-foreground">Contacto</Label>
                                <p className="text-sm font-medium">{selectedLead.nombreContacto}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Estado</Label>
                                <div className="mt-1">
                                  <Select
                                    value={selectedLead.estado}
                                    onValueChange={(value) => handleUpdateStatus(selectedLead.id, value as LeadStatus)}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="nuevo">Nuevo</SelectItem>
                                      <SelectItem value="contactado">Contactado</SelectItem>
                                      <SelectItem value="cotizado">Cotizado</SelectItem>
                                      <SelectItem value="ganado">Ganado</SelectItem>
                                      <SelectItem value="perdido">Perdido</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs text-muted-foreground">Email</Label>
                                <p className="text-sm font-medium">{selectedLead.email}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Teléfono</Label>
                                <p className="text-sm font-medium">{selectedLead.telefono}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Origen</Label>
                              <p className="text-sm font-medium">{sourceLabels[selectedLead.origen]}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Producto de Interés</Label>
                              <p className="text-sm font-medium">{selectedLead.productoInteres}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Cantidad Solicitada</Label>
                              <p className="text-sm font-medium">{selectedLead.cantidadSolicitada}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Notas</Label>
                              <p className="text-sm">{selectedLead.notas}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                              <div>
                                <Label className="text-xs text-muted-foreground">Fecha de Contacto</Label>
                                <p className="text-sm">
                                  {new Date(selectedLead.fechaContacto).toLocaleString("es-MX")}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Última Actualización</Label>
                                <p className="text-sm">{new Date(selectedLead.updatedAt).toLocaleString("es-MX")}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Select value={lead.estado} onValueChange={(value) => handleUpdateStatus(lead.id, value as LeadStatus)}>
                      <SelectTrigger className="w-full lg:w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nuevo">Nuevo</SelectItem>
                        <SelectItem value="contactado">Contactado</SelectItem>
                        <SelectItem value="cotizado">Cotizado</SelectItem>
                        <SelectItem value="ganado">Ganado</SelectItem>
                        <SelectItem value="perdido">Perdido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredLeads.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No se encontraron leads con los filtros aplicados</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CRMLayout>
  )
}
