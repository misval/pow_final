'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bed, Bath, Square, MapPin, Hash, User, Mail, CalendarIcon, CreditCard } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { IPV4 } from '../../../../global'
import { Propiedad } from '@/types/propiedad'

export default function DetallesPropiedad({ params }: { params: Promise<{ id: number }> }) {
  const [propiedad, setPropiedad] = useState<Propiedad | null>();

  useEffect(()=> {
    const fetchPropiedad = async () => {
      const id = ((await params).id);
      const res = await fetch(`http://${IPV4}:4567/propiedades/${id}`);
      const data = await res.json();
      setPropiedad(data);
    }
    fetchPropiedad();
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6"> 
      <Link href='/propiedades'>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al listado
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className='self-center'>
          <img className="rounded-xl" src={propiedad?.Imagenes[0] !== undefined ? propiedad?.Imagenes[0].url : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" } alt={propiedad?.ubicacion} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">{propiedad?.ubicacion}</CardTitle>
              </div>
              <Badge variant="secondary" className="text-lg py-1">
                {propiedad?.tipo}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <span className="flex items-center">
                  <Bed className="mr-1 h-5 w-5" />
                  {propiedad?.ambientes}
                </span>
                <span className="flex items-center">
                  <Bath className="mr-1 h-5 w-5" />
                  {propiedad?.banios}
                </span>
                <span className="flex items-center">
                  <Square className="mr-1 h-5 w-5" />
                  {propiedad?.mts_cuadrados_cubiertos} m²
                </span>
              </div>
            </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Información del Propietario</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src='' alt="Foto del propietario" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold">{propiedad?.Propietario.nombre}</p>
                    <p className="text-sm text-muted-foreground">Propietario</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">CUIL: {propiedad?.Propietario.CUIL}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">DNI: {propiedad?.Propietario.DNI}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Email: {propiedad?.Propietario.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Fecha de Nacimiento: {propiedad?.Propietario.fechaNacimiento}</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">CBU: {propiedad?.Propietario.CBU}</span>
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
