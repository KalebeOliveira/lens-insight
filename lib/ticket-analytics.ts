export interface Ticket {
  id: string
  parentServiceRequest: string
  status: string
  user: string
  contactType: string
  service: string
  configurationItem: string
  category: string
  subCategory: string
  causedByChange: string
  impact: string
  urgency: string
  assignmentGroup: string
  assignedTo: string
  itCrisis: string
  supplier: string
  externalReference: string
  shortDescription: string
  description: string
  closeCode: string
  closureNotes: string
  workNotes: string
  additionalComments: string
  opened: string
  openedBy: string
  resolved: string
  resolvedBy: string
  watchList: string
  correlationId: string
  sapImplementationStatus: string
  followUp: string
  threeStrikeRule: string
  dueDate: string
  reasonForWaiting: string
  actionsTaken: string
  active: string
  resolutionTime: number
  cost: number
}

export class TicketAnalytics {
  static calculateMetrics(tickets: Ticket[]) {
    const total = tickets.length
    const resolved = tickets.filter((t) => t.status === "Resolved").length
    const avgResolutionTime =
      tickets.filter((t) => t.resolutionTime > 0).reduce((sum, t) => sum + t.resolutionTime, 0) /
        tickets.filter((t) => t.resolutionTime > 0).length || 0
    const totalCost = tickets.reduce((sum, t) => sum + t.cost, 0)

    return {
      total,
      resolved,
      avgResolutionTime,
      totalCost,
      resolutionRate: (resolved / total) * 100,
    }
  }

  static detectSimilarTickets(tickets: Ticket[], timeWindowHours = 2) {
    const alerts: { type: string; service: string; category: string; count: number; tickets: string[] }[] = []
    const now = new Date()

    // Agrupar tickets por servicio y descripción similar
    const groups = tickets.reduce(
      (acc, ticket) => {
        const key = `${ticket.service}-${ticket.category}`
        if (!acc[key]) acc[key] = []
        acc[key].push(ticket)
        return acc
      },
      {} as Record<string, Ticket[]>,
    )

    // Detectar patrones
    Object.entries(groups).forEach(([key, groupTickets]) => {
      const recentTickets = groupTickets.filter((ticket) => {
        const ticketTime = new Date(ticket.opened)
        const hoursDiff = (now.getTime() - ticketTime.getTime()) / (1000 * 60 * 60)
        return hoursDiff <= timeWindowHours
      })

      if (recentTickets.length >= 2) {
        alerts.push({
          type: "similar_tickets",
          service: key.split("-")[0],
          category: key.split("-")[1],
          count: recentTickets.length,
          tickets: recentTickets.map((t) => t.id),
        })
      }
    })

    return alerts
  }

  static prioritizeTickets(tickets: Ticket[]) {
    return tickets.sort((a, b) => {
      // Priorización basada en impacto, urgencia y tiempo
      const priorityScore = (ticket: Ticket) => {
        let score = 0

        // Impacto
        if (ticket.impact === "High") score += 3
        else if (ticket.impact === "Medium") score += 2
        else score += 1

        // Urgencia
        if (ticket.urgency === "High") score += 3
        else if (ticket.urgency === "Medium") score += 2
        else score += 1

        // Tiempo transcurrido
        const hoursOpen = (new Date().getTime() - new Date(ticket.opened).getTime()) / (1000 * 60 * 60)
        if (hoursOpen > 24) score += 2
        else if (hoursOpen > 8) score += 1

        return score
      }

      return priorityScore(b) - priorityScore(a)
    })
  }

  static generateInsights(tickets: Ticket[]) {
    const insights = []

    // Análisis de tendencias
    const categoryCount = tickets.reduce(
      (acc, ticket) => {
        acc[ticket.category] = (acc[ticket.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topCategory = Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0]

    if (topCategory) {
      insights.push({
        type: "trend",
        message: `La categoría "${topCategory[0]}" representa el ${((topCategory[1] / tickets.length) * 100).toFixed(1)}% de todos los tickets`,
      })
    }

    // Análisis de rendimiento
    const avgResolution =
      tickets.filter((t) => t.resolutionTime > 0).reduce((sum, t) => sum + t.resolutionTime, 0) /
      tickets.filter((t) => t.resolutionTime > 0).length

    if (avgResolution > 8) {
      insights.push({
        type: "performance",
        message: "El tiempo promedio de resolución está por encima del objetivo (8 horas)",
      })
    }

    return insights
  }
}
