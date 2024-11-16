'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Home, Filter } from 'lucide-react'

import { NavbarContent } from '@/components/ui/NavbarContent'

// Datos de ejemplo
const propiedades = [
  { id: 1, titulo: "Casa en la playa", tipo: "Casa", precio: 250000, ubicacion: "Costa del Sol" },
  { id: 2, titulo: "Apartamento céntrico", tipo: "Apartamento", precio: 150000, ubicacion: "Madrid" },
  { id: 3, titulo: "Chalet con jardín", tipo: "Chalet", precio: 350000, ubicacion: "Barcelona" },
  { id: 4, titulo: "Estudio moderno", tipo: "Estudio", precio: 100000, ubicacion: "Valencia" },
  { id: 5, titulo: "Ático de lujo", tipo: "Ático", precio: 500000, ubicacion: "Marbella" },
]

export default function Component() {
  const [busqueda, setBusqueda] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [ordenar, setOrdenar] = useState('precio-asc')
  const [isOpen, setIsOpen] = useState(false)

  const propiedadesFiltradas = propiedades
    .filter(propiedad => 
      propiedad.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
      (tipoFiltro === 'Todos' || propiedad.tipo === tipoFiltro)
    )
    .sort((a, b) => {
      if (ordenar === 'precio-asc') return a.precio - b.precio
      if (ordenar === 'precio-desc') return b.precio - a.precio
      return 0
    })

  const aplicarFiltros = () => {
    setIsOpen(false)
  }


  

  return (
    <div className="flex h-screen">
      <aside className="hidden md:flex flex-col w-64 p-4 border-r">
        <NavbarContent />
      </aside>

      <div className="flex-1 overflow-auto">
        <div className='container mx-auto p-4 pb-20'>
        <h1 className="text-2xl font-bold mb-4">Listado de Propiedades</h1>
        
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
                    {/* <Select
                      id="tipo"
                      value={tipoFiltro}
                      onValueChange={setTipoFiltro}
                      className="col-span-3"
                    >
                      <option value="Todos">Todos los tipos</option>
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Chalet">Chalet</option>
                      <option value="Estudio">Estudio</option>
                      <option value="Ático">Ático</option>
                    </Select> */}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ordenar" className="text-right">
                      Ordenar
                    </Label>
                    {/* <Select
                      id="ordenar"
                      value={ordenar}
                      onValueChange={setOrdenar}
                      className="col-span-3"
                    >
                      <option value="precio-asc">Precio: Menor a Mayor</option>
                      <option value="precio-desc">Precio: Mayor a Menor</option>
                    </Select> */}
                  </div>
                </div>
                <Button onClick={aplicarFiltros}>Aplicar Filtros</Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {propiedadesFiltradas.map(propiedad => (
              <Card key={propiedad.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    {propiedad.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Tipo:</strong> {propiedad.tipo}</p>
                  <p><strong>Precio:</strong> €{propiedad.precio.toLocaleString()}</p>
                  <p><strong>Ubicación:</strong> {propiedad.ubicacion}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
            aria-label="Agregar Propiedad"
          >
            <Plus className="h-6 w-6" />
          </Button>
          </div>
        </div>
      </div>  
    </div>
  )
}