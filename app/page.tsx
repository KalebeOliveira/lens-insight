"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid } from "recharts"
import { AlertTriangle, Clock, DollarSign, TrendingUp, FileText, Upload, Search, Filter } from "lucide-react"
import { AIInsightsPanel, type AIInsights } from "@/components/ai-insights-panel"

// Tipo para los tickets
type Ticket = {
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

// Mock data para demostración
const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    parentServiceRequest: "SR-2024-001",
    status: "Resolved",
    user: "Juan Pérez",
    contactType: "Email",
    service: "Email Service",
    configurationItem: "Exchange Server",
    category: "Infrastructure",
    subCategory: "Email Issues",
    causedByChange: "No",
    impact: "High",
    urgency: "High",
    assignmentGroup: "IT Support L2",
    assignedTo: "María García",
    itCrisis: "No",
    supplier: "Microsoft",
    externalReference: "MS-2024-001",
    shortDescription: "Email server down",
    description: "Users cannot access email services",
    closeCode: "Resolved",
    closureNotes: "Server restarted successfully",
    workNotes: "Investigated server logs",
    additionalComments: "Monitor for 24h",
    opened: "2024-01-15T09:00:00Z",
    openedBy: "System Monitor",
    resolved: "2024-01-15T11:30:00Z",
    resolvedBy: "María García",
    watchList: "IT Management",
    correlationId: "CORR-001",
    sapImplementationStatus: "N/A",
    followUp: "No",
    threeStrikeRule: "Strike 1",
    dueDate: "2024-01-15T17:00:00Z",
    reasonForWaiting: "N/A",
    actionsTaken: "Server restart, monitoring enabled",
    active: "No",
    resolutionTime: 2.5,
    cost: 150,
  },
  {
    id: "TKT-002",
    parentServiceRequest: "SR-2024-002",
    status: "In Progress",
    user: "Ana López",
    contactType: "Phone",
    service: "Network Service",
    configurationItem: "Core Switch",
    category: "Infrastructure",
    subCategory: "Network Connectivity",
    causedByChange: "Yes",
    impact: "Medium",
    urgency: "Medium",
    assignmentGroup: "Network Team",
    assignedTo: "Carlos Ruiz",
    itCrisis: "No",
    supplier: "Cisco",
    externalReference: "CISCO-2024-002",
    shortDescription: "Network connectivity issues",
    description: "Intermittent network connectivity in Building A",
    closeCode: "",
    closureNotes: "",
    workNotes: "Investigating switch configuration",
    additionalComments: "Affecting 50 users",
    opened: "2024-01-16T14:00:00Z",
    openedBy: "Ana López",
    resolved: "",
    resolvedBy: "",
    watchList: "Network Management",
    correlationId: "CORR-002",
    sapImplementationStatus: "N/A",
    followUp: "Yes",
    threeStrikeRule: "No strikes",
    dueDate: "2024-01-17T14:00:00Z",
    reasonForWaiting: "Vendor response",
    actionsTaken: "Initial diagnosis completed",
    active: "Yes",
    resolutionTime: 0,
    cost: 0,
  },
]

const chartConfig = {
  resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-3))",
  },
}

const resolutionTimeData = [
  { month: "Ene", avgTime: 4.2 },
  { month: "Feb", avgTime: 3.8 },
  { month: "Mar", avgTime: 4.5 },
  { month: "Abr", avgTime: 3.2 },
  { month: "May", avgTime: 2.9 },
  { month: "Jun", avgTime: 3.1 },
]

const categoryData = [
  { name: "Infrastructure", value: 45, color: "#0088FE" },
  { name: "Applications", value: 30, color: "#00C49F" },
  { name: "Security", value: 15, color: "#FFBB28" },
  { name: "Hardware", value: 10, color: "#FF8042" },
]

const costData = [
  { category: "Infrastructure", cost: 15000 },
  { category: "Applications", cost: 8000 },
  { category: "Security", cost: 12000 },
  { category: "Hardware", cost: 5000 },
]

export default function TicketAnalyticsApp() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets)
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "Posible Incidente Recurrente",
      description: "Se detectaron 3 tickets similares relacionados con 'Email Service' en las últimas 2 horas.",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: "info",
      title: "Tiempo de Resolución Mejorado",
      description: "El tiempo promedio de resolución ha mejorado un 15% este mes.",
      timestamp: new Date().toISOString(),
    },
  ])

  // Filtrar tickets
  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const matchesSearch =
        ticket.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
    setFilteredTickets(filtered)
  }, [searchTerm, statusFilter, tickets])

  // Calcular métricas
  const totalTickets = tickets.length
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved").length
  const avgResolutionTime =
    tickets.filter((t) => t.resolutionTime > 0).reduce((sum, t) => sum + t.resolutionTime, 0) /
      tickets.filter((t) => t.resolutionTime > 0).length || 0
  const totalCost = tickets.reduce((sum, t) => sum + t.cost, 0)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Verificar que sea un archivo CSV
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Por favor selecciona un archivo CSV válido')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string
        const lines = csvText.split('\n')
        
        // Obtener headers (primera línea)
        const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''))
        
        // Procesar cada línea de datos
        const newTickets: Ticket[] = lines.slice(1).filter(line => line.trim()).map((line, index) => {
          const values = line.split(',').map(value => value.trim().replace(/"/g, ''))
          const ticket: Record<string, string | number> = {}
          
          // Mapear cada columna del CSV a las propiedades del ticket
          headers.forEach((header, i) => {
            const value = values[i] || ''
            
            // Convertir tipos específicos
            if (header === 'resolutionTime' || header === 'cost') {
              ticket[header] = parseFloat(value) || 0
            } else {
              ticket[header] = value
            }
          })
          
          // Asegurar que todas las propiedades requeridas estén presentes
          return {
            id: (ticket.id as string) || `TKT-${String(index + 1).padStart(3, '0')}`,
            parentServiceRequest: (ticket.parentServiceRequest as string) || '',
            status: (ticket.status as string) || 'Open',
            user: (ticket.user as string) || '',
            contactType: (ticket.contactType as string) || '',
            service: (ticket.service as string) || '',
            configurationItem: (ticket.configurationItem as string) || '',
            category: (ticket.category as string) || '',
            subCategory: (ticket.subCategory as string) || '',
            causedByChange: (ticket.causedByChange as string) || 'No',
            impact: (ticket.impact as string) || 'Medium',
            urgency: (ticket.urgency as string) || 'Medium',
            assignmentGroup: (ticket.assignmentGroup as string) || '',
            assignedTo: (ticket.assignedTo as string) || '',
            itCrisis: (ticket.itCrisis as string) || 'No',
            supplier: (ticket.supplier as string) || '',
            externalReference: (ticket.externalReference as string) || '',
            shortDescription: (ticket.shortDescription as string) || '',
            description: (ticket.description as string) || '',
            closeCode: (ticket.closeCode as string) || '',
            closureNotes: (ticket.closureNotes as string) || '',
            workNotes: (ticket.workNotes as string) || '',
            additionalComments: (ticket.additionalComments as string) || '',
            opened: (ticket.opened as string) || new Date().toISOString(),
            openedBy: (ticket.openedBy as string) || '',
            resolved: (ticket.resolved as string) || '',
            resolvedBy: (ticket.resolvedBy as string) || '',
            watchList: (ticket.watchList as string) || '',
            correlationId: (ticket.correlationId as string) || '',
            sapImplementationStatus: (ticket.sapImplementationStatus as string) || 'N/A',
            followUp: (ticket.followUp as string) || 'No',
            threeStrikeRule: (ticket.threeStrikeRule as string) || 'No strikes',
            dueDate: (ticket.dueDate as string) || '',
            reasonForWaiting: (ticket.reasonForWaiting as string) || 'N/A',
            actionsTaken: (ticket.actionsTaken as string) || '',
            active: (ticket.active as string) || 'Yes',
            resolutionTime: (ticket.resolutionTime as number) || 0,
            cost: (ticket.cost as number) || 0,
          }
        })
        
        // Actualizar el estado con los nuevos tickets
        setTickets(newTickets)
        alert(`Se importaron ${newTickets.length} tickets exitosamente`)
        
      } catch (error) {
        console.error('Error procesando el archivo CSV:', error)
        alert('Error al procesar el archivo CSV. Verifica el formato del archivo.')
      }
    }
    
    reader.onerror = () => {
      alert('Error al leer el archivo')
    }
    
    reader.readAsText(file)
  }

  const generateAIInsights = async () => {
    if (tickets.length === 0) {
      alert('No hay tickets para analizar. Por favor, importa datos primero.')
      return
    }

    setIsGeneratingInsights(true)
    try {
      const response = await fetch('/api/analyze-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tickets }),
      })

      if (!response.ok) {
        throw new Error('Error al generar insights')
      }

      const data = await response.json()
      setAiInsights(data.insights)
    } catch (error) {
      console.error('Error generating AI insights:', error)
      alert('Error al generar insights con IA. Verifica tu conexión y configuración.')
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análisis de Tickets de Soporte</h1>
            <p className="text-gray-600">Dashboard inteligente para gestión y análisis de tickets</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                Importar Excel
              </label>
            </Button>
            <Button>Exportar Reporte</Button>
          </div>
        </div>

        {/* Alertas Inteligentes */}
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              className={alert.type === "warning" ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50"}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTickets}</div>
              <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Resueltos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedTickets}</div>
              <p className="text-xs text-muted-foreground">
                {((resolvedTickets / totalTickets) * 100).toFixed(1)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgResolutionTime.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">-15% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Costo Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principales */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tickets">Gestión de Tickets</TabsTrigger>
            <TabsTrigger value="analytics">Análisis Avanzado</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Gráfico de tiempo de resolución */}
              <Card>
                <CardHeader>
                  <CardTitle>Tiempo de Resolución Promedio</CardTitle>
                  <CardDescription>Tendencia mensual en horas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart data={resolutionTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="avgTime" stroke="var(--color-resolved)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico de categorías */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Categorías</CardTitle>
                  <CardDescription>Tickets por tipo de problema</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico de costos */}
              <Card>
                <CardHeader>
                  <CardTitle>Costos por Categoría</CardTitle>
                  <CardDescription>Análisis de costos operativos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={costData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="cost" fill="var(--color-resolved)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Análisis de causas raíz */}
              <Card>
                <CardHeader>
                  <CardTitle>Causas Raíz Identificadas</CardTitle>
                  <CardDescription>Problemas recurrentes detectados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">Fallas de Email Service</p>
                        <p className="text-sm text-gray-600">3 incidentes similares</p>
                      </div>
                      <Badge variant="destructive">Alta Prioridad</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">Problemas de Red</p>
                        <p className="text-sm text-gray-600">2 incidentes similares</p>
                      </div>
                      <Badge variant="secondary">Media Prioridad</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            {/* Filtros y búsqueda */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros y Búsqueda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por ID, descripción o usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="open">Abierto</SelectItem>
                      <SelectItem value="in progress">En Progreso</SelectItem>
                      <SelectItem value="resolved">Resuelto</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Más Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Tickets ({filteredTickets.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Servicio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Impacto</TableHead>
                        <TableHead>Urgencia</TableHead>
                        <TableHead>Asignado a</TableHead>
                        <TableHead>Tiempo Resolución</TableHead>
                        <TableHead>Costo</TableHead>
                        <TableHead>Fecha Apertura</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                ticket.status === "Resolved"
                                  ? "default"
                                  : ticket.status === "In Progress"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {ticket.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{ticket.user}</TableCell>
                          <TableCell>{ticket.service}</TableCell>
                          <TableCell>{ticket.category}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                ticket.impact === "High"
                                  ? "destructive"
                                  : ticket.impact === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {ticket.impact}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                ticket.urgency === "High"
                                  ? "destructive"
                                  : ticket.urgency === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {ticket.urgency}
                            </Badge>
                          </TableCell>
                          <TableCell>{ticket.assignedTo || "Sin asignar"}</TableCell>
                          <TableCell>{ticket.resolutionTime > 0 ? `${ticket.resolutionTime}h` : "-"}</TableCell>
                          <TableCell>${ticket.cost}</TableCell>
                          <TableCell>{new Date(ticket.opened).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {/* AI Insights Panel */}
            <AIInsightsPanel 
              insights={aiInsights}
              isLoading={isGeneratingInsights}
              onGenerateInsights={generateAIInsights}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis Predictivo</CardTitle>
                  <CardDescription>Predicciones basadas en patrones históricos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium">Predicción de Carga de Trabajo</h4>
                      <p className="text-sm text-gray-600">
                        Se espera un incremento del 20% en tickets la próxima semana
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium">Optimización de Recursos</h4>
                      <p className="text-sm text-gray-600">
                        Reasignar 2 técnicos al equipo de Infrastructure puede reducir el tiempo de resolución en 15%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Rendimiento</CardTitle>
                  <CardDescription>KPIs del equipo de soporte</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>SLA Cumplimiento</span>
                      <span className="font-bold text-green-600">94.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Satisfacción del Cliente</span>
                      <span className="font-bold text-blue-600">4.2/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tickets Reabiertos</span>
                      <span className="font-bold text-orange-600">3.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Eficiencia del Equipo</span>
                      <span className="font-bold text-purple-600">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
