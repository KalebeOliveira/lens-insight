"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  PieChart, 
  DollarSign, 
  Target, 
  TrendingUp, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Brain,
  Zap
} from "lucide-react"

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

interface AIInsightsPanelProps {
  insights: AIInsights | null
  isLoading: boolean
  onGenerateInsights: () => void
}

export function AIInsightsPanel({ insights, isLoading, onGenerateInsights }: AIInsightsPanelProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!insights) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Análisis Inteligente con IA
          </CardTitle>
          <CardDescription>
            Genera insights avanzados basados en tus datos de tickets usando inteligencia artificial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Haz clic en el botón para generar análisis inteligente de tus datos
            </p>
            <Button onClick={onGenerateInsights} disabled={isLoading}>
              {isLoading ? "Generando..." : "Generar Insights con IA"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Insights Generados por IA
        </CardTitle>
        <CardDescription>
          Análisis inteligente basado en patrones y tendencias de tus datos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="resolution">Tiempo Resolución</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="costs">Costos</TabsTrigger>
            <TabsTrigger value="root-causes">Causas Raíz</TabsTrigger>
            <TabsTrigger value="predictive">Predictivo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Average Resolution Time Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Tiempo Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insights.averageResolutionTime.currentAverage.toFixed(1)}h</div>
                  <p className="text-xs text-muted-foreground">{insights.averageResolutionTime.trend}</p>
                </CardContent>
              </Card>

              {/* Top Category Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Categoría Principal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{insights.categoryDistribution.topCategories[0] || 'N/A'}</div>
                  <p className="text-xs text-muted-foreground">
                    {insights.categoryDistribution.distribution[0]?.percentage.toFixed(1)}% del total
                  </p>
                </CardContent>
              </Card>

              {/* Total Cost Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Costo Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${insights.costsPerCategory.totalCost.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Promedio por ticket</p>
                </CardContent>
              </Card>

              {/* Root Causes Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Causas Raíz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insights.identifiedRootCauses.rootCauses.length}</div>
                  <p className="text-xs text-muted-foreground">Patrones identificados</p>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    SLA Cumplimiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insights.performanceMetrics.slaCompliance}%</div>
                  <p className="text-xs text-muted-foreground">Satisfacción: {insights.performanceMetrics.customerSatisfaction}/5</p>
                </CardContent>
              </Card>

              {/* Predictive Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Predicción
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium">Carga de trabajo</div>
                  <p className="text-xs text-muted-foreground">Incremento esperado</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resolution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Análisis de Tiempo de Resolución
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Métrica Actual</h4>
                    <div className="text-3xl font-bold text-blue-600">
                      {insights.averageResolutionTime.currentAverage.toFixed(1)}h
                    </div>
                    <Badge variant={insights.averageResolutionTime.trend.includes("Above") ? "destructive" : "default"}>
                      {insights.averageResolutionTime.trend}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Análisis</h4>
                    <p className="text-sm text-gray-600">{insights.averageResolutionTime.analysis}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Recomendaciones
                  </h4>
                  <ul className="space-y-2">
                    {insights.averageResolutionTime.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribución por Categorías
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Top Categorías</h4>
                    <div className="space-y-2">
                      {insights.categoryDistribution.topCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{category}</span>
                          <Badge variant="secondary">
                            {insights.categoryDistribution.distribution.find(d => d.category === category)?.percentage.toFixed(1)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Análisis</h4>
                    <p className="text-sm text-gray-600">{insights.categoryDistribution.analysis}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Recomendaciones
                  </h4>
                  <ul className="space-y-2">
                    {insights.categoryDistribution.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Análisis de Costos por Categoría
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Costo Total</h4>
                    <div className="text-3xl font-bold text-green-600">
                      ${insights.costsPerCategory.totalCost.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">
                      Promedio: ${(insights.costsPerCategory.totalCost / insights.costsPerCategory.costs.length).toFixed(2)} por categoría
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Análisis</h4>
                    <p className="text-sm text-gray-600">{insights.costsPerCategory.analysis}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Costos por Categoría</h4>
                  <div className="space-y-2">
                    {insights.costsPerCategory.costs.map((cost, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{cost.category}</div>
                          <div className="text-sm text-gray-600">Promedio: ${cost.averageCost.toFixed(2)}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${cost.totalCost.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Recomendaciones
                  </h4>
                  <ul className="space-y-2">
                    {insights.costsPerCategory.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="root-causes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Causas Raíz Identificadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Análisis General</h4>
                  <p className="text-sm text-gray-600">{insights.identifiedRootCauses.analysis}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Patrones Recurrentes</h4>
                  <div className="space-y-3">
                    {insights.identifiedRootCauses.rootCauses.map((cause, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{cause.cause}</h5>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{cause.frequency} ocurrencias</Badge>
                            <Badge variant={cause.impact === "High" ? "destructive" : "default"}>
                              {cause.impact} Impacto
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm mb-1">Recomendaciones:</h6>
                          <ul className="space-y-1">
                            {cause.recommendations.map((rec, recIndex) => (
                              <li key={recIndex} className="flex items-start gap-2 text-sm">
                                <Zap className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Análisis Predictivo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Predicción de Carga</h4>
                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertTitle>Pronóstico</AlertTitle>
                      <AlertDescription>{insights.predictiveAnalysis.workloadPrediction}</AlertDescription>
                    </Alert>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Análisis</h4>
                    <p className="text-sm text-gray-600">{insights.predictiveAnalysis.analysis}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Optimización de Recursos
                    </h4>
                    <ul className="space-y-2">
                      {insights.predictiveAnalysis.resourceOptimization.map((opt, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Factores de Riesgo
                    </h4>
                    <ul className="space-y-2">
                      {insights.predictiveAnalysis.riskFactors.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 