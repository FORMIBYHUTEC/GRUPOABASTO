import { Lead, Quote, Activity, DashboardMetrics, FunnelData } from "./types/crm"

export const DEMO_LEADS: Lead[] = [
  {
    id: "L001",
    nombreNegocio: "Restaurante El Buen Sabor",
    nombreContacto: "María González",
    email: "maria@elbuensabor.com",
    telefono: "+52 1 477 123 4567",
    origen: "web",
    fechaContacto: new Date("2025-12-20T10:30:00"),
    productoInteres: "Bolsas plásticas, desechables",
    cantidadSolicitada: "5000 piezas mensuales",
    notas: "Interesado en bolsas biodegradables. Requiere entrega semanal.",
    estado: "cotizado",
    createdAt: new Date("2025-12-20T10:30:00"),
    updatedAt: new Date("2025-12-21T14:20:00"),
  },
  {
    id: "L002",
    nombreNegocio: "Hotel Plaza Central",
    nombreContacto: "Carlos Ramírez",
    email: "compras@hotelplaza.com",
    telefono: "+52 1 477 234 5678",
    origen: "google_ads",
    fechaContacto: new Date("2025-12-21T09:15:00"),
    productoInteres: "Productos de limpieza industrial",
    cantidadSolicitada: "Pedido mensual aprox. $50,000",
    notas: "Hotel de 80 habitaciones. Necesita cotización completa de línea de limpieza.",
    estado: "contactado",
    createdAt: new Date("2025-12-21T09:15:00"),
    updatedAt: new Date("2025-12-21T16:45:00"),
  },
  {
    id: "L003",
    nombreNegocio: "Cafetería Aroma",
    nombreContacto: "Ana Martínez",
    email: "ana@cafeteriaaroma.com",
    telefono: "+52 1 477 345 6789",
    origen: "whatsapp",
    fechaContacto: new Date("2025-12-22T11:00:00"),
    productoInteres: "Vasos desechables, servilletas",
    cantidadSolicitada: "3000 vasos, 5000 servilletas",
    notas: "Urgente para evento del próximo fin de semana.",
    estado: "nuevo",
    createdAt: new Date("2025-12-22T11:00:00"),
    updatedAt: new Date("2025-12-22T11:00:00"),
  },
  {
    id: "L004",
    nombreNegocio: "Supermercado Mi Tienda",
    nombreContacto: "Roberto Silva",
    email: "roberto@mitienda.com",
    telefono: "+52 1 477 456 7890",
    origen: "meta_ads",
    fechaContacto: new Date("2025-12-19T14:30:00"),
    productoInteres: "Bolsas plásticas para supermercado",
    cantidadSolicitada: "20,000 piezas mensuales",
    notas: "Cliente recurrente potencial. Cadena de 3 sucursales.",
    estado: "ganado",
    createdAt: new Date("2025-12-19T14:30:00"),
    updatedAt: new Date("2025-12-22T10:00:00"),
  },
  {
    id: "L005",
    nombreNegocio: "Panadería Dulce Hogar",
    nombreContacto: "Laura Pérez",
    email: "laura@dulcehogar.com",
    telefono: "+52 1 477 567 8901",
    origen: "referido",
    fechaContacto: new Date("2025-12-18T16:00:00"),
    productoInteres: "Bolsas de papel, cajas",
    cantidadSolicitada: "2000 bolsas, 500 cajas",
    notas: "Referido por Restaurante El Buen Sabor. No respondió última llamada.",
    estado: "perdido",
    createdAt: new Date("2025-12-18T16:00:00"),
    updatedAt: new Date("2025-12-21T12:00:00"),
  },
]

export const DEMO_QUOTES: Quote[] = [
  {
    id: "Q001",
    leadId: "L001",
    fechaCotizacion: new Date("2025-12-21T14:20:00"),
    productos: [
      {
        producto: "Bolsas plásticas biodegradables (40x50cm)",
        cantidad: 5000,
        precioUnitario: 0.85,
        subtotal: 4250,
      },
      {
        producto: "Vasos desechables 16oz",
        cantidad: 2000,
        precioUnitario: 0.45,
        subtotal: 900,
      },
    ],
    precioTotal: 5150,
    validezDias: 15,
    estado: "enviada",
    comentarios: "Incluye envío gratuito en CDMX. Entrega en 5 días hábiles.",
    createdAt: new Date("2025-12-21T14:20:00"),
    updatedAt: new Date("2025-12-21T14:20:00"),
  },
  {
    id: "Q002",
    leadId: "L004",
    fechaCotizacion: new Date("2025-12-20T10:00:00"),
    productos: [
      {
        producto: "Bolsas plásticas supermercado (30x40cm)",
        cantidad: 20000,
        precioUnitario: 0.65,
        subtotal: 13000,
      },
    ],
    precioTotal: 13000,
    validezDias: 30,
    estado: "aceptada",
    fechaRespuesta: new Date("2025-12-22T09:30:00"),
    comentarios: "Cliente aceptó. Pedido mensual recurrente establecido.",
    createdAt: new Date("2025-12-20T10:00:00"),
    updatedAt: new Date("2025-12-22T10:00:00"),
  },
]

export const DEMO_ACTIVITIES: Activity[] = [
  {
    id: "A001",
    leadId: "L001",
    fecha: new Date("2025-12-20T11:00:00"),
    tipo: "llamada",
    resultado: "contactado",
    notas: "Cliente interesado. Solicitó cotización formal. Prefiere bolsas biodegradables.",
    createdAt: new Date("2025-12-20T11:00:00"),
  },
  {
    id: "A002",
    leadId: "L001",
    fecha: new Date("2025-12-21T14:30:00"),
    tipo: "email",
    resultado: "contactado",
    notas: "Cotización enviada por email. Seguimiento programado para mañana.",
    createdAt: new Date("2025-12-21T14:30:00"),
  },
  {
    id: "A003",
    leadId: "L002",
    fecha: new Date("2025-12-21T16:45:00"),
    tipo: "whatsapp",
    resultado: "contactado",
    notas: "Conversación inicial. Cliente solicita visita para conocer productos de limpieza.",
    createdAt: new Date("2025-12-21T16:45:00"),
  },
  {
    id: "A004",
    leadId: "L004",
    fecha: new Date("2025-12-19T15:00:00"),
    tipo: "llamada",
    resultado: "contactado",
    notas: "Primera llamada. Cliente muy interesado en volumen.",
    createdAt: new Date("2025-12-19T15:00:00"),
  },
  {
    id: "A005",
    leadId: "L004",
    fecha: new Date("2025-12-22T09:30:00"),
    tipo: "email",
    resultado: "contactado",
    notas: "Cliente confirmó aceptación de cotización. Pedido procesado.",
    createdAt: new Date("2025-12-22T09:30:00"),
  },
  {
    id: "A006",
    leadId: "L005",
    fecha: new Date("2025-12-18T17:00:00"),
    tipo: "llamada",
    resultado: "no_contesta",
    notas: "No contestó. Dejé mensaje de voz.",
    createdAt: new Date("2025-12-18T17:00:00"),
  },
  {
    id: "A007",
    leadId: "L005",
    fecha: new Date("2025-12-21T12:00:00"),
    tipo: "whatsapp",
    resultado: "sin_interes",
    notas: "Cliente indica que encontró otro proveedor. Lead marcado como perdido.",
    createdAt: new Date("2025-12-21T12:00:00"),
  },
]

export function calculateMetrics(leads: Lead[], quotes: Quote[]): DashboardMetrics {
  const totalLeads = leads.length
  const leadsNuevos = leads.filter((l) => l.estado === "nuevo").length
  const leadsContactados = leads.filter((l) => l.estado === "contactado").length
  const leadsCotizados = leads.filter((l) => l.estado === "cotizado").length
  const leadsGanados = leads.filter((l) => l.estado === "ganado").length
  const leadsPerdidos = leads.filter((l) => l.estado === "perdido").length

  const tasaConversion = totalLeads > 0 ? (leadsContactados / totalLeads) * 100 : 0
  const tasaCierre = leadsCotizados > 0 ? (leadsGanados / leadsCotizados) * 100 : 0

  const quotesAceptadas = quotes.filter((q) => q.estado === "aceptada")
  const valorPromedioPedido =
    quotesAceptadas.length > 0
      ? quotesAceptadas.reduce((sum, q) => sum + q.precioTotal, 0) / quotesAceptadas.length
      : 0

  const tiempoPromedioCierre = 3.5

  return {
    totalLeads,
    leadsNuevos,
    leadsContactados,
    leadsCotizados,
    leadsGanados,
    leadsPerdidos,
    tasaConversion,
    tasaCierre,
    valorPromedioPedido,
    tiempoPromedioCierre,
  }
}

export function getFunnelData(leads: Lead[]): FunnelData {
  return {
    visitas: 1250,
    leadsGenerados: leads.length,
    contactados: leads.filter((l) => ["contactado", "cotizado", "ganado"].includes(l.estado)).length,
    cotizados: leads.filter((l) => ["cotizado", "ganado"].includes(l.estado)).length,
    aceptados: leads.filter((l) => l.estado === "ganado").length,
    ganados: leads.filter((l) => l.estado === "ganado").length,
    perdidos: leads.filter((l) => l.estado === "perdido").length,
  }
}
