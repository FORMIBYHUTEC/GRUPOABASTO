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
import { DEMO_LEADS, DEMO_ACTIVITIES } from "@/lib/crm-data"
import { Activity, ActivityType, ActivityResult } from "@/lib/types/crm"
import { Plus, Phone, Mail, MessageCircle, Users, Calendar, Search } from "lucide-react"

const activityIcons: Record<ActivityType, any> = {
  llamada: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  reunion: Users,
}

const activityColors: Record<ActivityType, string> = {
  llamada: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  whatsapp: "bg-green-500/10 text-green-500 border-green-500/20",
  email: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  reunion: "bg-orange-500/10 text-orange-500 border-orange-500/20",
}

const resultColors: Record<ActivityResult, string> = {
  contactado: "bg-green-500/10 text-green-500 border-green-500/20",
  no_contesta: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  cita_agendada: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  sin_interes: "bg-red-500/10 text-red-500 border-red-500/20",
}

const activityLabels: Record<ActivityType, string> = {
  llamada: "Llamada",
  whatsapp: "WhatsApp",
  email: "Email",
  reunion: "Reunión",
}

const resultLabels: Record<ActivityResult, string> = {
  contactado: "Contactado",
  no_contesta: "No Contesta",
  cita_agendada: "Cita Agendada",
  sin_interes: "Sin Interés",
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(
    DEMO_ACTIVITIES.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()),
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<ActivityType | "all">("all")
  const [isNewActivityOpen, setIsNewActivityOpen] = useState(false)

  const filteredActivities = activities.filter((activity) => {
    const lead = DEMO_LEADS.find((l) => l.id === activity.leadId)
    const matchesSearch =
      lead?.nombreNegocio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.notas.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || activity.tipo === filterType
    return matchesSearch && matchesType
  })

  const handleNewActivity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newActivity: Activity = {
      id: `A${String(activities.length + 1).padStart(3, "0")}`,
      leadId: formData.get("leadId") as string,
      fecha: new Date(),
      tipo: formData.get("tipo") as ActivityType,
      resultado: formData.get("resultado") as ActivityResult,
      notas: formData.get("notas") as string,
      createdAt: new Date(),
    }
    setActivities([newActivity, ...activities])
    setIsNewActivityOpen(false)
  }

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Registro de Actividades</h2>
            <p className="text-muted-foreground mt-1">Historial de interacciones con leads</p>
          </div>
          <Dialog open={isNewActivityOpen} onOpenChange={setIsNewActivityOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Actividad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registrar Nueva Actividad</DialogTitle>
                <DialogDescription>Documenta una interacción con un lead</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewActivity} className="space-y-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Actividad *</Label>
                    <Select name="tipo" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llamada">Llamada</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="reunion">Reunión</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resultado">Resultado *</Label>
                    <Select name="resultado" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el resultado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contactado">Contactado</SelectItem>
                        <SelectItem value="no_contesta">No Contesta</SelectItem>
                        <SelectItem value="cita_agendada">Cita Agendada</SelectItem>
                        <SelectItem value="sin_interes">Sin Interés</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notas">Notas / Detalles *</Label>
                  <Textarea
                    id="notas"
                    name="notas"
                    rows={4}
                    placeholder="Describe los detalles de la conversación, acuerdos, próximos pasos..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsNewActivityOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Registrar Actividad</Button>
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
                  placeholder="Buscar por cliente o notas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={(value) => setFilterType(value as ActivityType | "all")}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="llamada">Llamadas</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Emails</SelectItem>
                  <SelectItem value="reunion">Reuniones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["llamada", "whatsapp", "email", "reunion"] as ActivityType[]).map((tipo) => {
            const count = activities.filter((a) => a.tipo === tipo).length
            const Icon = activityIcons[tipo]
            return (
              <Card key={tipo}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${activityColors[tipo]} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                      <p className="text-xs text-muted-foreground">{activityLabels[tipo]}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Activities Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Línea de Tiempo</CardTitle>
            <CardDescription>Historial cronológico de actividades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity, index) => {
                const lead = DEMO_LEADS.find((l) => l.id === activity.leadId)
                const Icon = activityIcons[activity.tipo]
                const isToday =
                  new Date(activity.fecha).toDateString() === new Date().toDateString()
                const dateLabel = isToday
                  ? "Hoy"
                  : new Date(activity.fecha).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })

                return (
                  <div key={activity.id} className="relative">
                    {index !== filteredActivities.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-full ${activityColors[activity.tipo]} flex items-center justify-center shrink-0 relative z-10`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Card className="flex-1">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-foreground">{lead?.nombreNegocio}</h4>
                                <Badge className={activityColors[activity.tipo]} variant="outline">
                                  {activityLabels[activity.tipo]}
                                </Badge>
                                <Badge className={resultColors[activity.resultado]} variant="outline">
                                  {resultLabels[activity.resultado]}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{activity.notas}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {dateLabel} •{" "}
                                  {new Date(activity.fecha).toLocaleTimeString("es-MX", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )
              })}

              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No se encontraron actividades</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CRMLayout>
  )
}
