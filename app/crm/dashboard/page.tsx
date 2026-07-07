"use client"

import { CRMLayout } from "@/components/crm/crm-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMO_LEADS, DEMO_QUOTES, DEMO_ACTIVITIES, calculateMetrics, getFunnelData } from "@/lib/crm-data"
import {
  Users,
  UserCheck,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const metrics = calculateMetrics(DEMO_LEADS, DEMO_QUOTES)
  const funnelData = getFunnelData(DEMO_LEADS)

  const recentActivities = DEMO_ACTIVITIES.slice(0, 5).sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
  )

  const statCards = [
    {
      title: "Total Leads",
      value: metrics.totalLeads,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Leads Nuevos",
      value: metrics.leadsNuevos,
      icon: UserCheck,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Cotizaciones",
      value: metrics.leadsCotizados,
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Ganados",
      value: metrics.leadsGanados,
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ]

  const kpiCards = [
    {
      title: "Tasa de Conversión",
      value: `${metrics.tasaConversion.toFixed(1)}%`,
      description: "Leads contactados vs total",
      icon: Target,
      trend: metrics.tasaConversion > 50 ? "up" : "down",
    },
    {
      title: "Tasa de Cierre",
      value: `${metrics.tasaCierre.toFixed(1)}%`,
      description: "Cotizaciones ganadas",
      icon: TrendingUp,
      trend: metrics.tasaCierre > 30 ? "up" : "down",
    },
    {
      title: "Valor Promedio",
      value: `$${metrics.valorPromedioPedido.toLocaleString("es-MX")}`,
      description: "Por pedido ganado",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Tiempo de Cierre",
      value: `${metrics.tiempoPromedioCierre} días`,
      description: "Promedio lead → venta",
      icon: Clock,
      trend: "down",
    },
  ]

  const activityIcons = {
    llamada: Phone,
    whatsapp: MessageCircle,
    email: Mail,
    reunion: Users,
  }

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Vista general del rendimiento del CRM</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi) => (
            <Card key={kpi.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <kpi.icon className="h-5 w-5 text-muted-foreground" />
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">{kpi.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Embudo de Conversión</CardTitle>
              <CardDescription>Seguimiento del proceso de ventas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Visitas</span>
                  <span className="font-semibold">{funnelData.visitas}</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Leads Generados</span>
                  <span className="font-semibold">
                    {funnelData.leadsGenerados} ({((funnelData.leadsGenerados / funnelData.visitas) * 100).toFixed(1)}
                    %)
                  </span>
                </div>
                <Progress value={(funnelData.leadsGenerados / funnelData.visitas) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Contactados</span>
                  <span className="font-semibold">
                    {funnelData.contactados} ({((funnelData.contactados / funnelData.leadsGenerados) * 100).toFixed(1)}
                    %)
                  </span>
                </div>
                <Progress value={(funnelData.contactados / funnelData.leadsGenerados) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cotizados</span>
                  <span className="font-semibold">
                    {funnelData.cotizados} ({((funnelData.cotizados / funnelData.leadsGenerados) * 100).toFixed(1)}%)
                  </span>
                </div>
                <Progress value={(funnelData.cotizados / funnelData.leadsGenerados) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ganados</span>
                  <span className="font-semibold">
                    {funnelData.ganados} ({((funnelData.ganados / funnelData.leadsGenerados) * 100).toFixed(1)}%)
                  </span>
                </div>
                <Progress value={(funnelData.ganados / funnelData.leadsGenerados) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Actividades Recientes</CardTitle>
              <CardDescription>Últimas interacciones con leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const lead = DEMO_LEADS.find((l) => l.id === activity.leadId)
                  const Icon = activityIcons[activity.tipo]
                  return (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{lead?.nombreNegocio}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.notas}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.fecha).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads por Estado */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Leads por Estado</CardTitle>
            <CardDescription>Estado actual de todos los leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-500/10">
                <p className="text-3xl font-bold text-blue-500">{metrics.leadsNuevos}</p>
                <p className="text-sm text-muted-foreground mt-1">Nuevos</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                <p className="text-3xl font-bold text-yellow-500">{metrics.leadsContactados}</p>
                <p className="text-sm text-muted-foreground mt-1">Contactados</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-500/10">
                <p className="text-3xl font-bold text-purple-500">{metrics.leadsCotizados}</p>
                <p className="text-sm text-muted-foreground mt-1">Cotizados</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-500/10">
                <p className="text-3xl font-bold text-green-500">{metrics.leadsGanados}</p>
                <p className="text-sm text-muted-foreground mt-1">Ganados</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-red-500/10">
                <p className="text-3xl font-bold text-red-500">{metrics.leadsPerdidos}</p>
                <p className="text-sm text-muted-foreground mt-1">Perdidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CRMLayout>
  )
}
