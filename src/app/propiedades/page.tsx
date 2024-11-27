'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Home, Filter } from 'lucide-react'

import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'

import { NavbarContent } from '@/components/ui/NavbarContent'
import CrearPropiedad from './CrearPropiedad'

import { Propiedad } from '@/types/propiedad'

import { IPV4 } from '../../../global'
import Link from 'next/link'

export default function Component() {
  const [busqueda, setBusqueda] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      const res = await fetch(`http://${IPV4}:4567/propiedades`);
      const data: Propiedad[] = await res.json();
      setPropiedades(data);
    } 
    fetchPropiedades();
  }, [])

  return (
    <div className="flex h-screen">
      <aside className="hidden md:flex flex-col w-64 p-4 border-r">
        <NavbarContent />
      </aside>  

      <div className="flex-1 overflow-auto">
        <div className='container mx-auto p-4 pb-20'>
        <h1 className="text-2xl font-bold mb-4 mt-12">Listado de Propiedades</h1>
        
        <div className="flex flex-col gap-4 mb-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar propiedades..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          
          <div className="flex justify-end mb-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="px-4 py-2">
                  <Filter className="mr-2 h-4 w-4" /> Filtrar y Ordenar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filtrar y Ordenar</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tipo" className="text-right">
                      Tipo
                    </Label>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ordenar" className="text-right">
                      Ordenar
                    </Label>
                  </div>
                </div>
                <Button>Aplicar Filtros</Button>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ubicacion</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Destino</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                propiedades.map(propiedad => (
                    <TableRow key={propiedad.id}>
                        <TableCell>{propiedad.ubicacion}</TableCell>
                        <TableCell>{propiedad.tipo}</TableCell>
                        <TableCell>{propiedad.destino}</TableCell>
                        <TableCell>
                          <Link href={`/propiedades/${propiedad.id}`} className='bg-slate-200 p-2 rounded-md'>
                            Ver detalles
                          </Link>
                        </TableCell>
                    </TableRow>
                ))
              }
            </TableBody>
          </Table>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
                aria-label="Agregar Propiedad"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>
          
            <CrearPropiedad setIsModalOpen={setIsModalOpen}></CrearPropiedad>
          </Dialog>
          </div>
        </div>
      </div>  
    </div>
  )
}