import type { Ticket } from "@/app/api/analyze-tickets/route"

export interface AnalyticsData {
  totalTickets: number
  resolvedTickets: number
  averageResolutionTime: number
  totalCost: number
  categoryDistribution: Array<{ category: string; count: number; percentage: number }>
  costsPerCategory: Array<{ category: string; totalCost: number; averageCost: number }>
  rootCauses: Array<{
    cause: string
    frequency: number
    impact: string
    recommendations: string[]
  }>
  sampleTickets: Array<{
    id: string
    status: string
    category: string
    service: string
    impact: string
    urgency: string
    resolutionTime: number
    cost: number
    shortDescription: string
  }>
}

export function prepareDataForAI(tickets: Ticket[]): AnalyticsData {
  // Calculate basic metrics
  const total = tickets.length
  const resolved = tickets.filter(t => t.status === "Resolved").length
  const avgResolutionTime = tickets.filter(t => t.resolutionTime > 0)
    .reduce((sum, t) => sum + t.resolutionTime, 0) / 
    tickets.filter(t => t.resolutionTime > 0).length || 0
  const totalCost = tickets.reduce((sum, t) => sum + t.cost, 0)

  // Generate category distribution
  const categoryCount = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categoryDistribution = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
    percentage: (count / total) * 100
  })).sort((a, b) => b.count - a.count)

  // Generate costs per category
  const categoryCosts = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.category]) {
      acc[ticket.category] = { totalCost: 0, count: 0 }
    }
    acc[ticket.category].totalCost += ticket.cost
    acc[ticket.category].count += 1
    return acc
  }, {} as Record<string, { totalCost: number; count: number }>)

  const costsPerCategory = Object.entries(categoryCosts).map(([category, data]) => ({
    category,
    totalCost: data.totalCost,
    averageCost: data.totalCost / data.count
  })).sort((a, b) => b.totalCost - a.totalCost)

  // Identify root causes
  const patterns = tickets.reduce((acc, ticket) => {
    const key = `${ticket.service}-${ticket.category}`
    if (!acc[key]) {
      acc[key] = {
        service: ticket.service,
        category: ticket.category,
        tickets: [],
        count: 0
      }
    }
    acc[key].tickets.push(ticket)
    acc[key].count += 1
    return acc
  }, {} as Record<string, { service: string; category: string; tickets: Ticket[]; count: number }>)

  const rootCauses = Object.values(patterns)
    .filter(pattern => pattern.count >= 2)
    .map(pattern => ({
      cause: `${pattern.service} - ${pattern.category}`,
      frequency: pattern.count,
      impact: pattern.tickets.some(t => t.impact === "High") ? "High" : "Medium",
      recommendations: [
        `Implementar monitoreo proactivo para ${pattern.service}`,
        `Crear documentación de resolución para ${pattern.category}`,
        `Establecer procedimientos estándar para incidentes similares`
      ]
    }))
    .sort((a, b) => b.frequency - a.frequency)

  // Prepare sample tickets for analysis
  const sampleTickets = tickets.slice(0, 5).map(t => ({
    id: t.id,
    status: t.status,
    category: t.category,
    service: t.service,
    impact: t.impact,
    urgency: t.urgency,
    resolutionTime: t.resolutionTime,
    cost: t.cost,
    shortDescription: t.shortDescription
  }))

  return {
    totalTickets: total,
    resolvedTickets: resolved,
    averageResolutionTime: avgResolutionTime,
    totalCost: totalCost,
    categoryDistribution,
    costsPerCategory,
    rootCauses,
    sampleTickets
  }
}

export function validateTicketData(tickets: Ticket[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (tickets.length === 0) {
    errors.push("No hay tickets para analizar")
  }

  // Check for required fields
  const requiredFields = ['id', 'status', 'category', 'service', 'impact', 'urgency']
  tickets.forEach((ticket, index) => {
    requiredFields.forEach(field => {
      if (!ticket[field as keyof Ticket]) {
        errors.push(`Ticket ${index + 1}: Campo requerido '${field}' está vacío`)
      }
    })
  })

  // Check for valid numeric fields
  tickets.forEach((ticket, index) => {
    if (typeof ticket.resolutionTime !== 'number' || ticket.resolutionTime < 0) {
      errors.push(`Ticket ${index + 1}: Tiempo de resolución debe ser un número positivo`)
    }
    if (typeof ticket.cost !== 'number' || ticket.cost < 0) {
      errors.push(`Ticket ${index + 1}: Costo debe ser un número positivo`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function generateInsightsSummary(analyticsData: AnalyticsData): string {
  const { totalTickets, resolvedTickets, averageResolutionTime, totalCost, categoryDistribution } = analyticsData
  
  const resolutionRate = (resolvedTickets / totalTickets) * 100
  const topCategory = categoryDistribution[0]
  
  return `Análisis de ${totalTickets} tickets:
- Tasa de resolución: ${resolutionRate.toFixed(1)}%
- Tiempo promedio de resolución: ${averageResolutionTime.toFixed(1)} horas
- Costo total: $${totalCost.toLocaleString()}
- Categoría principal: ${topCategory?.category || 'N/A'} (${topCategory?.percentage.toFixed(1)}% del total)`
} 