'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, Calendar, DollarSign, User, Home, CheckCircle, XCircle } from 'lucide-react'
import { Contrato } from '@/types/contrato'
import { IPV4 } from '../../../../global'

// Datos de ejemplo para un contrato
// const contrato = {
//   id: 1,
//   titulo: "Contrato de Alquiler",
//   tipo: "Alquiler", // Puede ser "Alquiler" o "Venta"
//   valor: 1200, // Valor mensual para alquiler, o precio total para venta
//   fechaInicio: "2023-06-01",
//   fechaFin: "2024-05-31",
//   estado: "Activo",
//   inquilino: "Ana García",
//   propietario: "Juan Pérez",
//   propiedad: {
//     id: 101,
//     direccion: "Calle Mayor 123, 28001 Madrid",
//     tipo: "Apartamento",
//     habitaciones: 2,
//     banos: 1,
//     superficie: 80
//   },
//   garantes: [
//     "Martin Rodriguez",
//     "Juan Garcia"
//   ],
//   descripcion: "Este contrato establece los términos y condiciones para el alquiler de un apartamento en el centro de Madrid, incluyendo derechos y responsabilidades tanto del inquilino como del propietario.",
//   clausulas: [
//     "Duración del contrato",
//     "Importe del alquiler y forma de pago",
//     "Fianza",
//     "Gastos incluidos y excluidos",
//     "Mantenimiento y reparaciones",
//     "Prohibición de subarriendo",
//     "Causas de resolución del contrato"
//   ] 
// }

export default function DetallesContrato({ params }: { params: Promise<{ id: number }> }) {
  // const [mostrarMasClausulas, setMostrarMasClausulas] = useState(false)
  const [contrato, setContrato] = useState<Contrato>()

  useEffect(() => {
    const fetchContrato = async () => {
      const id = ((await params).id);
      const res = await fetch(`http://${IPV4}:4567/contratoId/${id}`);
      const data = await res.json();
      setContrato(data);
    }
    fetchContrato();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Link href='/contratos'>
        <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al listado
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <FileText className="mr-2 h-6 w-6" />
                {contrato?.propiedad.ubicacion}
              </CardTitle>
            </div>
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
                  <span className="ml-2">{contrato?.propiedad.destino}</span>
                </li>
                
                <li className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span className="font-medium">Fecha de inicio:</span>
                  <span className="ml-2">{contrato?.fechaInicio}</span>
                </li>
                <li className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span className="font-medium">Fecha de fin:</span>
                  <span className="ml-2">{ contrato?.fechaFin}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Partes Involucradas</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span className="font-medium">Inquilino:</span>
                  <span className="ml-2">{contrato?.inquilino.nombre}</span>
                </li>
                 <li className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span className="font-medium">Garante:</span>
                  <span className="ml-2">{contrato?.garantes[0]?.nombre ? contrato?.garantes[0]?.nombre : <>-</>}</span>
                </li>
                 <li className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span className="font-medium">Garante:</span>
                  <span className="ml-2">{contrato?.garantes[1]?.nombre ? contrato?.garantes[1]?.nombre : <>-</> }</span>
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
                <span className="ml-2">{contrato?.propiedad.ubicacion}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">Tipo:</span>
                <span className="ml-2">{contrato?.propiedad.tipo}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">Destino:</span>
                <span className="ml-2">{contrato?.propiedad.destino}</span>
              </li>
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