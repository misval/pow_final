'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, Calendar, DollarSign, User, Home, CheckCircle, XCircle } from 'lucide-react'

// Datos de ejemplo para un contrato
const contrato = {
  id: 1,
  titulo: "Contrato de Alquiler",
  tipo: "Alquiler", // Puede ser "Alquiler" o "Venta"
  valor: 1200, // Valor mensual para alquiler, o precio total para venta
  fechaInicio: "2023-06-01",
  fechaFin: "2024-05-31",
  estado: "Activo",
  inquilino: "Ana García",
  propietario: "Juan Pérez",
  propiedad: {
    id: 101,
    direccion: "Calle Mayor 123, 28001 Madrid",
    tipo: "Apartamento",
    habitaciones: 2,
    banos: 1,
    superficie: 80
  },
  garantes: [
    "Martin Rodriguez",
    "Juan Garcia"
  ],
  descripcion: "Este contrato establece los términos y condiciones para el alquiler de un apartamento en el centro de Madrid, incluyendo derechos y responsabilidades tanto del inquilino como del propietario.",
  clausulas: [
    "Duración del contrato",
    "Importe del alquiler y forma de pago",
    "Fianza",
    "Gastos incluidos y excluidos",
    "Mantenimiento y reparaciones",
    "Prohibición de subarriendo",
    "Causas de resolución del contrato"
  ],
  hitos: [
    { fecha: "2023-06-01", descripcion: "Inicio del contrato y entrega de llaves" },
    { fecha: "2023-12-01", descripcion: "Revisión semestral del estado de la vivienda" },
    { fecha: "2024-03-01", descripcion: "Notificación de renovación o finalización" },
    { fecha: "2024-05-31", descripcion: "Fin del contrato y devolución de llaves" }
  ]
}

export default function DetallesContrato(id : number) {
  const [mostrarMasClausulas, setMostrarMasClausulas] = useState(false)

  console.log(id);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button variant="ghost" className="mb-4" onClick={() => console.log('Volver al listado')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al listado
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <FileText className="mr-2 h-6 w-6" />
                {contrato.titulo}
              </CardTitle>
              <p className="text-muted-foreground mt-2">ID del Contrato: {contrato.id}</p>
            </div>
            <Badge variant="default" className="text-lg py-1">
              {contrato.estado}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Detalles del Contrato</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Home className="mr-2 h-5 w-5" />
                  <span className="font-medium">Tipo de Contrato:</span>
                  <span className="ml-2">{contrato.tipo}</span>
                </li>
                <li className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  <span className="font-medium">{contrato.tipo === "Alquiler" ? "Alquiler Mensual:" : "Precio de Venta:"}</span>
                  <span className="ml-2">€{contrato.valor.toLocaleString()}</span>
                </li>
                <li className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span className="font-medium">Fecha de inicio:</span>
                  <span className="ml-2">{new Date(contrato.fechaInicio).toLocaleDateString()}</span>
                </li>
                <li className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span className="font-medium">Fecha de fin:</span>
                  <span className="ml-2">{new Date(contrato.fechaFin).toLocaleDateString()}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Partes Involucradas</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span className="font-medium">Inquilino:</span>
                  <span className="ml-2">{contrato.inquilino}</span>
                </li>
                <li className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span className="font-medium">Propietario:</span>
                  <span className="ml-2">{contrato.propietario}</span>
                </li>
                 <li className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span className="font-medium">Garante:</span>
                  <span className="ml-2">{contrato.garantes[0]}</span>
                </li>
                 <li className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span className="font-medium">Garante:</span>
                  <span className="ml-2">{contrato.garantes[1]}</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-xl font-semibold mb-2">Propiedad</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                <span className="font-medium">Dirección:</span>
                <span className="ml-2">{contrato.propiedad.direccion}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">Tipo:</span>
                <span className="ml-2">{contrato.propiedad.tipo}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">Habitaciones:</span>
                <span className="ml-2">{contrato.propiedad.habitaciones}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">Baños:</span>
                <span className="ml-2">{contrato.propiedad.banos}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">Superficie:</span>
                <span className="ml-2">{contrato.propiedad.superficie} m²</span>
              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-xl font-semibold mb-2">Descripción</h3>
            <p className="mb-4">{contrato.descripcion}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Cláusulas Principales</h3>
            <ul className="grid grid-cols-2 gap-2">
              {contrato.clausulas.slice(0, mostrarMasClausulas ? undefined : 4).map((clausula, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  {clausula}
                </li>
              ))}
            </ul>
            {contrato.clausulas.length > 4 && (
              <Button
                variant="link"
                onClick={() => setMostrarMasClausulas(!mostrarMasClausulas)}
                className="mt-2"
              >
                {mostrarMasClausulas ? 'Ver menos' : 'Ver más'}
              </Button>
            )}
          </div>  */}

          <Separator className="my-6" />

          <div>
            <h3 className="text-xl font-semibold mb-2">Hitos del Contrato</h3>
            <ul className="space-y-2">
              {contrato.hitos.map((hito, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1">
                    {new Date(hito.fecha) <= new Date() ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium">{new Date(hito.fecha).toLocaleDateString()}: </span>
                    {hito.descripcion}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4 mt-8">
        <Button size="lg">Editar Contrato</Button>
        <Button size="lg" variant="outline">Descargar PDF</Button>
      </div>
    </div>
  )
}