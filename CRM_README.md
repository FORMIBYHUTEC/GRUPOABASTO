# CRM - Grupo Abasto

Sistema de gestión de relaciones con clientes (CRM) completo para Grupo Abasto.

## 🚀 Acceso al Sistema

**URL de acceso:** http://localhost:3000/crm/login

### Usuarios de Prueba

#### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`

#### Vendedor
- **Usuario:** `vendedor`
- **Contraseña:** `vendedor123`

## 📋 Funcionalidades Principales

### 1. Dashboard
- Vista general de métricas clave (KPIs)
- Total de leads, nuevos, contactados, cotizados, ganados
- Tasas de conversión y cierre
- Valor promedio de pedidos
- Tiempo promedio de cierre
- Embudo de conversión completo
- Actividades recientes
- Distribución de leads por estado

### 2. Gestión de Leads
**Ruta:** `/crm/leads`

#### Campos del Lead:
- ID único
- Nombre del negocio/persona
- Nombre del contacto
- Correo electrónico
- Teléfono/WhatsApp
- Origen (Web, Meta Ads, Google Ads, WhatsApp, Referido)
- Fecha de contacto
- Producto de interés
- Cantidad solicitada
- Notas/Requerimientos adicionales
- Estado (Nuevo, Contactado, Cotizado, Ganado, Perdido)

#### Funcionalidades:
- ✅ Crear nuevos leads
- ✅ Buscar y filtrar leads
- ✅ Ver detalles completos
- ✅ Actualizar estado de leads
- ✅ Filtrar por estado

### 3. Sistema de Cotizaciones
**Ruta:** `/crm/quotes`

#### Campos de Cotización:
- ID único
- Lead asociado
- Fecha de cotización
- Productos cotizados (múltiples)
  - Nombre del producto
  - Cantidad
  - Precio unitario
  - Subtotal
- Precio total
- Validez (7/15/30 días)
- Estado (Pendiente, Enviada, Aceptada, Rechazada)
- Fecha de respuesta
- Comentarios/Condiciones

#### Funcionalidades:
- ✅ Crear cotizaciones con múltiples productos
- ✅ Calcular totales automáticamente
- ✅ Actualizar estado de cotizaciones
- ✅ Ver detalles completos
- ✅ Buscar cotizaciones

### 4. Registro de Actividades
**Ruta:** `/crm/activities`

#### Tipos de Actividad:
- 📞 Llamada
- 💬 WhatsApp
- 📧 Email
- 👥 Reunión

#### Resultados:
- Contactado
- No contesta
- Cita agendada
- Sin interés

#### Funcionalidades:
- ✅ Registrar nuevas actividades
- ✅ Línea de tiempo cronológica
- ✅ Filtrar por tipo de actividad
- ✅ Buscar en notas
- ✅ Estadísticas por tipo

### 5. Reportes y Análisis
**Ruta:** `/crm/reports`

#### Métricas Incluidas:

**Reporte Semanal:**
- Leads totales
- Leads contactados
- Cotizaciones enviadas
- Cotizaciones ganadas
- Cotizaciones perdidas

**KPIs Principales:**
- Tasa de conversión (Leads contactados vs total)
- Tasa de cierre (Cotizaciones ganadas)
- Valor promedio por pedido
- Tiempo promedio de cierre

**Análisis por Canal:**
- Leads por canal de origen
- CPL (Costo por Lead) por canal
- Distribución porcentual

**Actividades:**
- Distribución por tipo de actividad
- Porcentaje de cada tipo

**Proyección de Ventas:**
- Valor proyectado mensual
- Ventas proyectadas
- Leads esperados
- Progreso del mes

**Embudo de Conversión:**
- Visitas → Leads → Contactados → Cotizados → Ganados
- Porcentajes de conversión en cada etapa

## 📊 Estructura de Datos

### Estados del Embudo (Funnel)
1. **Visita** - Usuarios que llegan a la web
2. **Lead generado** - Usuarios que envían formulario o WhatsApp
3. **Contactado** - Lead contactado por el equipo
4. **Cotizado** - Cotización enviada al cliente
5. **Aceptado** - Cotización aceptada
6. **Ganado** - Pedido confirmado y procesado
7. **Perdido** - Cotización rechazada o sin respuesta

## 🎯 Métricas Clave (KPIs)

### Performance de la Landing
- **Tasa de Conversión Web → Lead:** (Leads / Visitas) × 100
- **Costo por Lead (CPL):** Total gasto publicidad / Leads
- **Tasa de rebote:** % visitantes que salen sin interactuar

### Gestión de Leads
- **% Leads Contactados:** (Contactados / Leads) × 100
- **% Leads Cotizados:** (Cotizados / Leads) × 100
- **% Contactos efectivos:** (Contactado con respuesta / Contactados) × 100

### Ventas
- **Tasa de cierre:** (Aceptados / Cotizados) × 100
- **Valor promedio del pedido:** Total ventas / Cotizaciones ganadas
- **Tiempo promedio de cierre:** Días desde Lead → Pedido Ganado

## 🔧 Datos de Prueba

El sistema incluye datos de demostración:
- **5 Leads** de ejemplo con diferentes estados
- **2 Cotizaciones** (1 enviada, 1 aceptada)
- **7 Actividades** registradas
- Métricas calculadas automáticamente

## 📱 Características Adicionales

### Responsive Design
- ✅ Diseño adaptable para móviles, tablets y desktop
- ✅ Sidebar colapsable en móviles
- ✅ Tablas y cards optimizadas

### Interfaz de Usuario
- ✅ Tema moderno con Tailwind CSS
- ✅ Componentes de shadcn/ui
- ✅ Iconos de Lucide React
- ✅ Animaciones suaves
- ✅ Estados visuales claros (badges, colores)

### Navegación
- ✅ Sidebar con navegación principal
- ✅ Indicador de página activa
- ✅ Información de usuario
- ✅ Botón de cerrar sesión

## 🔐 Seguridad

- Sistema de autenticación con localStorage
- Redirección automática si no está autenticado
- Protección de rutas del CRM
- Usuarios con roles (admin, vendedor)

## 📞 Contacto Actualizado

El número de teléfono ha sido actualizado en toda la landing page:
- **Nuevo número:** +52 1 477 577 0084
- Actualizado en: Footer, Página de contacto, Formularios, WhatsApp

## 🚀 Próximos Pasos Sugeridos

Para producción, considera:
1. Implementar base de datos real (PostgreSQL, MongoDB)
2. API backend con autenticación JWT
3. Integración con WhatsApp Business API
4. Automatizaciones de email
5. Notificaciones push
6. Exportación de reportes (PDF, Excel)
7. Integración con herramientas de marketing (Meta Ads, Google Ads)
8. Dashboard de administración de usuarios
9. Logs de auditoría
10. Backup automático de datos

## 📝 Notas Técnicas

- **Framework:** Next.js 16 con App Router
- **Lenguaje:** TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Estado:** React Hooks (useState, useEffect)
- **Almacenamiento:** localStorage (demo)
- **Iconos:** Lucide React
