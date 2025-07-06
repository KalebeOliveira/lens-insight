export const AI_CONFIG = {
  // OpenAI Configuration
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4',
  OPENAI_TEMPERATURE: parseFloat(process.env.OPENAI_TEMPERATURE || '0.3'),
  OPENAI_MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '4000'),
  
  // Analysis Parameters
  MIN_TICKETS_FOR_ANALYSIS: 1,
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

1. Identified Root Causes - Causas raíz identificadas
2. Predictive Analysis - Análisis predictivo basado en patrones

IMPORTANTE: 
- Recibirás todos los tickets con datos completos (todas las columnas disponibles)
- Para cada root cause identificada, debes generar recomendaciones específicas y detalladas basadas en el análisis de los datos
- Se conciso, menciona herramientas puntuales, no embellezcas las respuestas de los insights, tu publico es técnico y quiere respuestas concretas y con detalle
- Utiliza toda la información disponible (usuarios, grupos de asignación, proveedores, notas de trabajo, etc.) para generar insights más precisos
- Máximo 3-4 recomendaciones por root cause
- TODAS las respuestas deben estar en español

Responde en formato JSON estructurado con el siguiente esquema:
{
  "identifiedRootCauses": {
    "rootCauses": [{"cause": "string", "frequency": number, "impact": "string", "recommendations": ["string"]}],
    "analysis": "string"
  },
  "predictiveAnalysis": {
    "workloadPrediction": "string",
    "resourceOptimization": ["string"],
    "riskFactors": ["string"],
    "analysis": "string"
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