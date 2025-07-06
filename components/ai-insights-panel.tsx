"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Zap, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle,
  Loader2
} from 'lucide-react'

export interface AIInsights {
  identifiedRootCauses: {
    rootCauses: Array<{
      cause: string
      frequency: number
      impact: string
    }>
    recommendations: string[]
    analysis: string
  }
  predictiveAnalysis: {
    workloadPrediction: string
    resourceOptimization: string[]
    riskFactors: string[]
    analysis: string
  }
}

interface AIInsightsPanelProps {
  insights: AIInsights | null
  isLoading: boolean
  onGenerateInsights: () => void
}

export function AIInsightsPanel({ insights, isLoading, onGenerateInsights }: AIInsightsPanelProps) {
  const [activeTab, setActiveTab] = useState('root-causes')

  if (!insights) {
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
          <div className="text-center py-8">
            {isLoading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-black-500" />
                <p className="text-gray-600 mb-4">
                  Generando insights con IA...
                </p>
              </>
            ) : (
              <>
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">
                  Hacé clic en el botón para generar análisis inteligente de tus datos
                </p>
                <Button onClick={onGenerateInsights} disabled={isLoading}>
                  Generar Insights con IA
                </Button>
              </>
            )}
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="root-causes">Causas Raíz</TabsTrigger>
            <TabsTrigger value="predictive">Predictivo</TabsTrigger>
          </TabsList>

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
                    {insights.identifiedRootCauses.recommendations.map((rec: string, recIndex: number) => (
                      <li key={recIndex} className="flex items-start gap-2 text-sm">
                        <Zap className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
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