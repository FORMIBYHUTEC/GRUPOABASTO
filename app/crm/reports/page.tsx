"use client"

import { CRMLayout } from "@/components/crm/crm-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMO_LEADS, DEMO_QUOTES, DEMO_ACTIVITIES, calculateMetrics, getFunnelData } from "@/lib/crm-data"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Clock,
  Calendar,
  BarChart3,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"

export default function ReportsPage() {
  const metrics = calculateMetrics(DEMO_LEADS, DEMO_QUOTES)
  const funnelData = getFunnelData(DEMO_LEADS)

  const currentWeek = {
    leadsTotal: DEMO_LEADS.length,
    leadsContactados: DEMO_LEADS.filter((l) => ["contactado", "cotizado", "ganado"].includes(l.estado)).length,
    cotizacionesEnviadas: DEMO_QUOTES.length,
    cotizacionesGanadas: DEMO_QUOTES.filter((q) => q.estado === "aceptada").length,
    cotizacionesPerdidas: DEMO_QUOTES.filter((q) => q.estado === "rechazada").length,
  }

  const leadsBySource = {
    web: DEMO_LEADS.filter((l) => l.origen === "web").length,
    meta_ads: DEMO_LEADS.filter((l) => l.origen === "meta_ads").length,
    google_ads: DEMO_LEADS.filter((l) => l.origen === "google_ads").length,
    whatsapp: DEMO_LEADS.filter((l) => l.origen === "whatsapp").length,
    referido: DEMO_LEADS.filter((l) => l.origen === "referido").length,
  }

  const activitiesByType = {
    llamada: DEMO_ACTIVITIES.filter((a) => a.tipo === "llamada").length,
    whatsapp: DEMO_ACTIVITIES.filter((a) => a.tipo === "whatsapp").length,
    email: DEMO_ACTIVITIES.filter((a) => a.tipo === "email").length,
    reunion: DEMO_ACTIVITIES.filter((a) => a.tipo === "reunion").length,
  }

  const totalActivities = Object.values(activitiesByType).reduce((sum, count) => sum + count, 0)

  const cplByChannel = {
    web: 45.5,
    meta_ads: 78.2,
    google_ads: 62.8,
    whatsapp: 12.5,
    referido: 0,
  }

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Reportes y Análisis</h2>
          <p className="text-muted-foreground mt-1">Métricas detalladas del rendimiento del CRM</p>
        </div>

        {/* Reporte Semanal */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Reporte Semanal</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{currentWeek.leadsTotal}</p>
                  <p className="text-sm text-muted-foreground mt-1">Leads Totales</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Phone className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{currentWeek.leadsContactados}</p>
                  <p className="text-sm text-muted-foreground mt-1">Contactados</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{currentWeek.cotizacionesEnviadas}</p>
                  <p className="text-sm text-muted-foreground mt-1">Cotizaciones</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{currentWeek.cotizacionesGanadas}</p>
                  <p className="text-sm text-muted-foreground mt-1">Ganadas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <TrendingDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{currentWeek.cotizacionesPerdidas}</p>
                  <p className="text-sm text-muted-foreground mt-1">Perdidas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* KPIs Principales */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-4">KPIs Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-foreground">{metrics.tasaConversion.toFixed(1)}%</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">Tasa de Conversión</p>
                <p className="text-xs text-muted-foreground mt-1">Leads contactados vs total</p>
                <div className="mt-3">
                  <Progress value={metrics.tasaConversion} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-foreground">{metrics.tasaCierre.toFixed(1)}%</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">Tasa de Cierre</p>
                <p className="text-xs text-muted-foreground mt-1">Cotizaciones ganadas</p>
                <div className="mt-3">
                  <Progress value={metrics.tasaCierre} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-foreground">${metrics.valorPromedioPedido.toLocaleString("es-MX", { maximumFractionDigits: 0 })}</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">Valor Promedio</p>
                <p className="text-xs text-muted-foreground mt-1">Por pedido ganado</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <TrendingDown className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-foreground">{metrics.tiempoPromedioCierre}</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">Días de Cierre</p>
                <p className="text-xs text-muted-foreground mt-1">Promedio lead → venta</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads por Canal */}
          <Card>
            <CardHeader>
              <CardTitle>Leads por Canal de Origen</CardTitle>
              <CardDescription>Distribución de leads según fuente de tráfico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Sitio Web</span>
                    <span className="text-sm font-bold">{leadsBySource.web} leads</span>
                  </div>
                  <Progress value={(leadsBySource.web / DEMO_LEADS.length) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Meta Ads</span>
                    <span className="text-sm font-bold">{leadsBySource.meta_ads} leads</span>
                  </div>
                  <Progress value={(leadsBySource.meta_ads / DEMO_LEADS.length) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Google Ads</span>
                    <span className="text-sm font-bold">{leadsBySource.google_ads} leads</span>
                  </div>
                  <Progress value={(leadsBySource.google_ads / DEMO_LEADS.length) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">WhatsApp</span>
                    <span className="text-sm font-bold">{leadsBySource.whatsapp} leads</span>
                  </div>
                  <Progress value={(leadsBySource.whatsapp / DEMO_LEADS.length) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Referidos</span>
                    <span className="text-sm font-bold">{leadsBySource.referido} leads</span>
                  </div>
                  <Progress value={(leadsBySource.referido / DEMO_LEADS.length) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CPL por Canal */}
          <Card>
            <CardHeader>
              <CardTitle>Costo por Lead (CPL) por Canal</CardTitle>
              <CardDescription>Eficiencia de inversión publicitaria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(cplByChannel).map(([channel, cpl]) => {
                  const channelLabels: Record<string, string> = {
                    web: "Sitio Web",
                    meta_ads: "Meta Ads",
                    google_ads: "Google Ads",
                    whatsapp: "WhatsApp",
                    referido: "Referidos",
                  }
                  return (
                    <div key={channel} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                      <div>
                        <p className="font-medium text-foreground">{channelLabels[channel]}</p>
                        <p className="text-xs text-muted-foreground">
                          {leadsBySource[channel as keyof typeof leadsBySource]} leads generados
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
                          {cpl === 0 ? "Gratis" : `$${cpl.toFixed(2)}`}
                        </p>
                        <p className="text-xs text-muted-foreground">por lead</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actividades por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Actividades por Tipo</CardTitle>
              <CardDescription>Distribución de interacciones con leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Llamadas</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{activitiesByType.llamada}</p>
                    <p className="text-xs text-muted-foreground">
                      {((activitiesByType.llamada / totalActivities) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">WhatsApp</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{activitiesByType.whatsapp}</p>
                    <p className="text-xs text-muted-foreground">
                      {((activitiesByType.whatsapp / totalActivities) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Emails</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{activitiesByType.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {((activitiesByType.email / totalActivities) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Reuniones</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{activitiesByType.reunion}</p>
                    <p className="text-xs text-muted-foreground">
                      {((activitiesByType.reunion / totalActivities) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proyección Mensual */}
          <Card>
            <CardHeader>
              <CardTitle>Proyección de Ventas Mensual</CardTitle>
              <CardDescription>Estimación basada en datos actuales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground mb-2">Valor Proyectado</p>
                  <p className="text-4xl font-bold text-primary">
                    ${(metrics.valorPromedioPedido * metrics.leadsGanados * 4).toLocaleString("es-MX", { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Basado en tasa actual de cierre</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-foreground">{metrics.leadsGanados * 4}</p>
                    <p className="text-xs text-muted-foreground mt-1">Ventas Proyectadas</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-foreground">{DEMO_LEADS.length * 4}</p>
                    <p className="text-xs text-muted-foreground mt-1">Leads Esperados</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso del mes</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Embudo Detallado */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis del Embudo de Conversión</CardTitle>
            <CardDescription>Visitas → Leads → Ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-500/10">
                  <p className="text-3xl font-bold text-blue-500">{funnelData.visitas}</p>
                  <p className="text-sm text-muted-foreground mt-1">Visitas</p>
                  <p className="text-xs text-muted-foreground mt-1">100%</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-500/10">
                  <p className="text-3xl font-bold text-green-500">{funnelData.leadsGenerados}</p>
                  <p className="text-sm text-muted-foreground mt-1">Leads</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((funnelData.leadsGenerados / funnelData.visitas) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                  <p className="text-3xl font-bold text-yellow-500">{funnelData.contactados}</p>
                  <p className="text-sm text-muted-foreground mt-1">Contactados</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((funnelData.contactados / funnelData.leadsGenerados) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-500/10">
                  <p className="text-3xl font-bold text-purple-500">{funnelData.cotizados}</p>
                  <p className="text-sm text-muted-foreground mt-1">Cotizados</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((funnelData.cotizados / funnelData.leadsGenerados) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-emerald-500/10">
                  <p className="text-3xl font-bold text-emerald-500">{funnelData.ganados}</p>
                  <p className="text-sm text-muted-foreground mt-1">Ganados</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((funnelData.ganados / funnelData.leadsGenerados) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-500/10">
                  <p className="text-3xl font-bold text-red-500">{funnelData.perdidos}</p>
                  <p className="text-sm text-muted-foreground mt-1">Perdidos</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((funnelData.perdidos / funnelData.leadsGenerados) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CRMLayout>
  )
}
