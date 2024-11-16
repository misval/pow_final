'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bed, Bath, Square, MapPin, Hash, User, Mail, CalendarIcon, CreditCard } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

// private Propietario propietario;
//   private Integer id;
//   private String ubicacion;
//   private String tipo;
//   private String destino;
//   private Integer ambientes;
//   private Integer banios;
//   private Integer mts_cuadrados;
//   private String Propietario_PERSONA_CUIL;


// Datos de ejemplo para una propiedad
const propiedad = {
  id: 1,
  titulo: "Complejo Estudiantil",
  tipo: "Alquiler",
  ubicacion: "Calle 23 entre 2 y 102",
  ambientes: 5,
  banios: 4,
  mtsCuadrados: 350,
  // propietario: {
  // },
  imagenPrincipal: "/placeholder.svg?height=400&width=600"
}

export default function DetallesPropiedad(id : number) {
  const [mostrarMasCaracteristicas, setMostrarMasCaracteristicas] = useState(false)

  console.log(id);
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button variant="ghost" className="mb-4" onClick={() => console.log('Volver al listado')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al listado
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img
            src={propiedad.imagenPrincipal}
            alt={propiedad.titulo}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">{propiedad.titulo}</CardTitle>
                <p className="text-muted-foreground flex items-center mt-2">
                  <MapPin className="mr-1 h-4 w-4" />
                  {propiedad.ubicacion}
                </p>
              </div>
              <Badge variant="secondary" className="text-lg py-1">
                {propiedad.tipo}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <span className="flex items-center">
                  <Bed className="mr-1 h-5 w-5" />
                  {propiedad.ambientes}
                </span>
                <span className="flex items-center">
                  <Bath className="mr-1 h-5 w-5" />
                  {propiedad.banios}
                </span>
                <span className="flex items-center">
                  <Square className="mr-1 h-5 w-5" />
                  {propiedad.mtsCuadrados} m²
                </span>
              </div>
            </div>

            {/* <h3 className="text-xl font-semibold mb-2">Características</h3>
            <ul className="grid grid-cols-2 gap-2">
              {propiedad.caracteristicas.map((caracteristica, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {caracteristica}
                </li>
              ))}
            </ul> */}

          <div>
            <h3 className="text-lg font-semibold mb-2">Información del Propietario</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Foto del propietario" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold">Juan Pérez</p>
                    <p className="text-sm text-muted-foreground">Propietario</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">CUIL: 20-12345678-9</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">DNI: 12345678</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Email: juan.perez@email.com</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Fecha de Nacimiento: 15/05/1980</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">CBU: 0123456789012345678901</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </CardContent>
          <div className="flex justify-center space-x-4 mt-8 mb-8">
            <Button size="lg" variant="destructive">Eliminar propiedad</Button>
            <Button size="lg">Modificar propiedad</Button>
          </div>
        </Card>
      </div>

      
    </div>
  )
}

// export async function generateStaticParams() {
//   const posts = await fetch('http://localhost/propiedades/').then((res) => res.json())
 
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
