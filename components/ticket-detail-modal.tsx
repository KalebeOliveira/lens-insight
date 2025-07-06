"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TicketDetailModalProps {
  ticket: {
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
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TicketDetailModal({ ticket, open, onOpenChange }: TicketDetailModalProps) {
  if (!ticket) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Detalles del Ticket - {ticket.id}</DialogTitle>
          <DialogDescription>Información completa del ticket de soporte</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Información General</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>ID:</strong> {ticket.id}
                  </div>
                  <div>
                    <strong>Parent Service Request:</strong> {ticket.parentServiceRequest}
                  </div>
                  <div>
                    <strong>Estado:</strong> <Badge>{ticket.status}</Badge>
                  </div>
                  <div>
                    <strong>Usuario:</strong> {ticket.user}
                  </div>
                  <div>
                    <strong>Tipo de Contacto:</strong> {ticket.contactType}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Clasificación</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Servicio:</strong> {ticket.service}
                  </div>
                  <div>
                    <strong>Elemento de Configuración:</strong> {ticket.configurationItem}
                  </div>
                  <div>
                    <strong>Categoría:</strong> {ticket.category}
                  </div>
                  <div>
                    <strong>Sub-categoría:</strong> {ticket.subCategory}
                  </div>
                  <div>
                    <strong>Causado por Cambio:</strong> {ticket.causedByChange}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Priorización */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Priorización</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Impacto:</strong>{" "}
                    <Badge variant={ticket.impact === "High" ? "destructive" : "secondary"}>{ticket.impact}</Badge>
                  </div>
                  <div>
                    <strong>Urgencia:</strong>{" "}
                    <Badge variant={ticket.urgency === "High" ? "destructive" : "secondary"}>{ticket.urgency}</Badge>
                  </div>
                  <div>
                    <strong>Fecha Límite:</strong> {new Date(ticket.dueDate).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Asignación</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Grupo de Asignación:</strong> {ticket.assignmentGroup}
                  </div>
                  <div>
                    <strong>Asignado a:</strong> {ticket.assignedTo}
                  </div>
                  <div>
                    <strong>Crisis IT:</strong> {ticket.itCrisis}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Descripción y notas */}
            <div>
              <h4 className="font-semibold mb-2">Descripción</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Descripción Corta:</strong> {ticket.shortDescription}
                </div>
                <div>
                  <strong>Descripción Completa:</strong> {ticket.description}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Notas de Trabajo</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Notas de Trabajo:</strong> {ticket.workNotes}
                </div>
                <div>
                  <strong>Comentarios Adicionales:</strong> {ticket.additionalComments}
                </div>
                <div>
                  <strong>Acciones Tomadas:</strong> {ticket.actionsTaken}
                </div>
              </div>
            </div>

            <Separator />

            {/* Fechas y resolución */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Fechas</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Abierto:</strong> {new Date(ticket.opened).toLocaleString()}
                  </div>
                  <div>
                    <strong>Abierto por:</strong> {ticket.openedBy}
                  </div>
                  {ticket.resolved && (
                    <>
                      <div>
                        <strong>Resuelto:</strong> {new Date(ticket.resolved).toLocaleString()}
                      </div>
                      <div>
                        <strong>Resuelto por:</strong> {ticket.resolvedBy}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Resolución</h4>
                <div className="space-y-2 text-sm">
                  {ticket.closeCode && (
                    <div>
                      <strong>Código de Cierre:</strong> {ticket.closeCode}
                    </div>
                  )}
                  {ticket.closureNotes && (
                    <div>
                      <strong>Notas de Cierre:</strong> {ticket.closureNotes}
                    </div>
                  )}
                  <div>
                    <strong>Tiempo de Resolución:</strong>{" "}
                    {ticket.resolutionTime > 0 ? `${ticket.resolutionTime} horas` : "Pendiente"}
                  </div>
                  <div>
                    <strong>Costo:</strong> ${ticket.cost}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Información adicional */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Referencias Externas</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Proveedor:</strong> {ticket.supplier}
                  </div>
                  <div>
                    <strong>Referencia Externa:</strong> {ticket.externalReference}
                  </div>
                  <div>
                    <strong>ID de Correlación:</strong> {ticket.correlationId}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Seguimiento</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Lista de Observadores:</strong> {ticket.watchList}
                  </div>
                  <div>
                    <strong>Seguimiento:</strong> {ticket.followUp}
                  </div>
                  <div>
                    <strong>Regla de Tres Strikes:</strong> {ticket.threeStrikeRule}
                  </div>
                  <div>
                    <strong>Razón de Espera:</strong> {ticket.reasonForWaiting}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
