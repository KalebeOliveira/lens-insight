export const AI_CONFIG = {
  // OpenAI Configuration
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4',
  OPENAI_TEMPERATURE: parseFloat(process.env.OPENAI_TEMPERATURE || '0.3'),
  OPENAI_MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
  
  // Analysis Parameters
  MIN_TICKETS_FOR_ANALYSIS: 5,
  MAX_SAMPLE_TICKETS: 10,
  ROOT_CAUSE_MIN_FREQUENCY: 2,
  
  // Performance Thresholds
  RESOLUTION_TIME_TARGET: 8, // hours
  SLA_COMPLIANCE_TARGET: 95, // percentage
  CUSTOMER_SATISFACTION_TARGET: 4.0, // out of 5
  
  // UI Configuration
  REFRESH_INTERVAL: 30000, // 30 seconds
  LOADING_TIMEOUT: 30000, // 30 seconds
  
  // Error Messages
  ERRORS: {
    NO_DATA: 'No hay tickets para analizar. Por favor, importa datos primero.',
    API_ERROR: 'Error al generar insights con IA. Verifica tu conexión y configuración.',
    INVALID_DATA: 'Los datos proporcionados no son válidos. Verifica el formato.',
    TIMEOUT: 'La generación de insights está tardando más de lo esperado.',
    INSUFFICIENT_DATA: 'Se necesitan al menos 5 tickets para generar análisis significativo.'
  }
} as const

export const SYSTEM_PROMPT = `Eres un experto analista de datos de soporte técnico. Analiza los datos de tickets proporcionados y genera insights estructurados para las siguientes funcionalidades:

1. Average Resolution Time - Análisis del tiempo promedio de resolución
2. Category Distribution - Distribución de tickets por categorías
3. Costs per Category - Análisis de costos por categoría
4. Identified Root Causes - Causas raíz identificadas
5. Predictive Analysis - Análisis predictivo basado en patrones
6. Performance Metrics - Métricas de rendimiento del equipo

Responde en formato JSON estructurado con el siguiente esquema:
{
  "averageResolutionTime": {
    "currentAverage": number,
    "trend": "string",
    "recommendations": ["string"],
    "analysis": "string"
  },
  "categoryDistribution": {
    "distribution": [{"category": "string", "count": number, "percentage": number}],
    "topCategories": ["string"],
    "analysis": "string",
    "recommendations": ["string"]
  },
  "costsPerCategory": {
    "costs": [{"category": "string", "totalCost": number, "averageCost": number}],
    "totalCost": number,
    "analysis": "string",
    "recommendations": ["string"]
  },
  "identifiedRootCauses": {
    "rootCauses": [{"cause": "string", "frequency": number, "impact": "string", "recommendations": ["string"]}],
    "analysis": "string"
  },
  "predictiveAnalysis": {
    "workloadPrediction": "string",
    "resourceOptimization": ["string"],
    "riskFactors": ["string"],
    "analysis": "string"
  },
  "performanceMetrics": {
    "slaCompliance": number,
    "customerSatisfaction": number,
    "reopenedTickets": number,
    "teamEfficiency": number,
    "analysis": "string",
    "recommendations": ["string"]
  }
}`

export const REQUIRED_TICKET_FIELDS = [
  'id',
  'status', 
  'category',
  'service',
  'impact',
  'urgency',
  'resolutionTime',
  'cost'
] as const

export const TICKET_STATUSES = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed'
} as const

export const IMPACT_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const

export const URGENCY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const 