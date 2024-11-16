'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bed, Bath, Square, MapPin, Euro } from 'lucide-react'

// Datos de ejemplo para una propiedad
const propiedad = {
  id: 1,
  titulo: "Villa de lujo con vistas al mar",
  tipo: "Villa",
  precio: 1250000,
  ubicacion: "Costa del Sol, Málaga",
  habitaciones: 5,
  banos: 4,
  superficie: 350,
  descripcion: "Espectacular villa de lujo con impresionantes vistas al mar Mediterráneo. Esta propiedad de ensueño cuenta con amplios espacios, acabados de alta calidad y una piscina infinita. Perfecta para aquellos que buscan privacidad y confort en una de las zonas más exclusivas de la Costa del Sol.",
  caracteristicas: [
    "Piscina infinita",
    "Jardín paisajístico",
    "Garaje para 3 coches",
    "Cocina de diseño",
    "Domótica",
    "Gimnasio",
    "Sauna",
    "Terraza con vistas panorámicas"
  ],
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
              <p className="text-3xl font-bold flex items-center">
                <Euro className="mr-1 h-6 w-6" />
                {propiedad.precio.toLocaleString()}
              </p>
              <div className="flex space-x-4">
                <span className="flex items-center">
                  <Bed className="mr-1 h-5 w-5" />
                  {propiedad.habitaciones}
                </span>
                <span className="flex items-center">
                  <Bath className="mr-1 h-5 w-5" />
                  {propiedad.banos}
                </span>
                <span className="flex items-center">
                  <Square className="mr-1 h-5 w-5" />
                  {propiedad.superficie} m²
                </span>
              </div>
            </div>

            {/* <h3 className="text-xl font-semibold mb-2">Descripción</h3> */}
            {/* <p className="mb-4">{propiedad.descripcion}</p> */}

            <h3 className="text-xl font-semibold mb-2">Características</h3>
            <ul className="grid grid-cols-2 gap-2">
              {propiedad.caracteristicas.map((caracteristica, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {caracteristica}
                </li>
              ))}
            </ul>
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
