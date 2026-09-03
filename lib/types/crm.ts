export type LeadStatus = "nuevo" | "contactado" | "cotizado" | "ganado" | "perdido"
export type LeadSource = "web" | "meta_ads" | "google_ads" | "whatsapp" | "referido"
export type ActivityType = "llamada" | "whatsapp" | "email" | "reunion"
export type ActivityResult = "contactado" | "no_contesta" | "cita_agendada" | "sin_interes"
export type QuoteStatus = "enviada" | "aceptada" | "rechazada" | "pendiente"

export interface Lead {
  id: string
  nombreNegocio: string
  nombreContacto: string
  email: string
  telefono: string
  origen: LeadSource
  fechaContacto: Date
  productoInteres: string
  cantidadSolicitada: string
  notas: string
  estado: LeadStatus
  createdAt: Date
  updatedAt: Date
}

export interface Quote {
  id: string
  leadId: string
  fechaCotizacion: Date
  productos: QuoteProduct[]
  precioTotal: number
  validezDias: number
  estado: QuoteStatus
  fechaRespuesta?: Date
  comentarios: string
  createdAt: Date
  updatedAt: Date
}

export interface QuoteProduct {
  producto: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

export interface Activity {
  id: string
  leadId: string
  fecha: Date
  tipo: ActivityType
  resultado: ActivityResult
  notas: string
  createdAt: Date
}

export interface DashboardMetrics {
  totalLeads: number
  leadsNuevos: number
  leadsContactados: number
  leadsCotizados: number
  leadsGanados: number
  leadsPerdidos: number
  tasaConversion: number
  tasaCierre: number
  valorPromedioPedido: number
  tiempoPromedioCierre: number
}

export interface FunnelData {
  visitas: number
  leadsGenerados: number
  contactados: number
  cotizados: number
  aceptados: number
  ganados: number
  perdidos: number
}
