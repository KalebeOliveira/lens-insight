import { NextRequest, NextResponse } from 'next/server'
import { AI_CONFIG, SYSTEM_PROMPT } from '@/config/ai-config'

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

export interface AIInsights {
  averageResolutionTime: {
    currentAverage: number
    trend: string
    recommendations: string[]
    analysis: string
  }
  categoryDistribution: {
    distribution: Array<{ category: string; count: number; percentage: number }>
    topCategories: string[]
    analysis: string
    recommendations: string[]
  }
  costsPerCategory: {
    costs: Array<{ category: string; totalCost: number; averageCost: number }>
    totalCost: number
    analysis: string
    recommendations: string[]
  }
  identifiedRootCauses: {
    rootCauses: Array<{
      cause: string
      frequency: number
      impact: string
      recommendations: string[]
    }>
    analysis: string
  }
  predictiveAnalysis: {
    workloadPrediction: string
    resourceOptimization: string[]
    riskFactors: string[]
    analysis: string
  }
  performanceMetrics: {
    slaCompliance: number
    customerSatisfaction: number
    reopenedTickets: number
    teamEfficiency: number
    analysis: string
    recommendations: string[]
  }
}

function calculateBasicMetrics(tickets: Ticket[]) {
  const total = tickets.length
  const resolved = tickets.filter(t => t.status === "Resolved").length
  const avgResolutionTime = tickets.filter(t => t.resolutionTime > 0)
    .reduce((sum, t) => sum + t.resolutionTime, 0) / 
    tickets.filter(t => t.resolutionTime > 0).length || 0
  const totalCost = tickets.reduce((sum, t) => sum + t.cost, 0)

  return { total, resolved, avgResolutionTime, totalCost }
}

function generateCategoryDistribution(tickets: Ticket[]) {
  const categoryCount = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const total = tickets.length
  const distribution = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
    percentage: (count / total) * 100
  })).sort((a, b) => b.count - a.count)

  return distribution
}

function generateCostsPerCategory(tickets: Ticket[]) {
  const categoryCosts = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.category]) {
      acc[ticket.category] = { totalCost: 0, count: 0 }
    }
    acc[ticket.category].totalCost += ticket.cost
    acc[ticket.category].count += 1
    return acc
  }, {} as Record<string, { totalCost: number; count: number }>)

  return Object.entries(categoryCosts).map(([category, data]) => ({
    category,
    totalCost: data.totalCost,
    averageCost: data.totalCost / data.count
  })).sort((a, b) => b.totalCost - a.totalCost)
}

function identifyRootCauses(tickets: Ticket[]) {
  // Group tickets by service and category to identify patterns
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

  // Find patterns with multiple occurrences
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

  return rootCauses
}

async function generateAIInsights(tickets: Ticket[]): Promise<AIInsights> {
  const metrics = calculateBasicMetrics(tickets)
  const categoryDistribution = generateCategoryDistribution(tickets)
  const costsPerCategory = generateCostsPerCategory(tickets)
  const rootCauses = identifyRootCauses(tickets)

  // Prepare data for ChatGPT analysis
  const analysisData = {
    totalTickets: metrics.total,
    resolvedTickets: metrics.resolved,
    averageResolutionTime: metrics.avgResolutionTime,
    totalCost: metrics.totalCost,
    categoryDistribution,
    costsPerCategory,
    rootCauses,
    sampleTickets: tickets.slice(0, 5).map(t => ({
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
  }

  try {
    // Call ChatGPT API for analysis
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: `Analiza los siguientes datos de tickets de soporte técnico y genera insights detallados: ${JSON.stringify(analysisData, null, 2)}`
          }
        ],
        temperature: AI_CONFIG.OPENAI_TEMPERATURE,
        max_tokens: AI_CONFIG.OPENAI_MAX_TOKENS
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = JSON.parse(data.choices[0].message.content)

    return aiResponse as AIInsights

  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    
    // Throw error instead of returning mock data
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      throw new Error('API Key de OpenAI inválida. Verifique sua configuração no arquivo .env')
    } else if (errorMessage.includes('429') || errorMessage.includes('Rate limit')) {
      throw new Error('Limite de requisições excedido. Tente novamente em alguns minutos')
    } else if (errorMessage.includes('insufficient_quota')) {
      throw new Error('Créditos insuficientes na conta OpenAI. Adicione créditos para continuar')
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      throw new Error('Erro de conexão. Verifique sua internet e tente novamente')
    } else {
      throw new Error(`Erro ao conectar com OpenAI: ${errorMessage}`)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tickets } = await request.json()

    if (!tickets || !Array.isArray(tickets)) {
      return NextResponse.json(
        { error: 'Dados de tickets inválidos fornecidos' },
        { status: 400 }
      )
    }

    if (tickets.length < AI_CONFIG.MIN_TICKETS_FOR_ANALYSIS) {
      return NextResponse.json(
        { error: `É necessário pelo menos ${AI_CONFIG.MIN_TICKETS_FOR_ANALYSIS} tickets para gerar análise significativa` },
        { status: 400 }
      )
    }

    const insights = await generateAIInsights(tickets)

    return NextResponse.json({
      success: true,
      insights,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in analyze-tickets API:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 