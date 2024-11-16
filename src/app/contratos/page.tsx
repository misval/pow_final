'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Plus, FileText, Filter, Menu, Home, Building, LogOut } from 'lucide-react'

import { NavbarContent } from '@/components/ui/NavbarContent'

import CrearContrato from './CrearContrato'

// Datos de ejemplo para contratos
const contratos = [
  { id: 1, titulo: "Calle 23 entre 2 y 102", tipo: "alquiler", valor: 50000, fechaInicio: "2023-01-15", estado: "Activo" },
  { id: 2, titulo: "Calle 23 entre 2 y 102", tipo: "alquiler", valor: 50000, fechaInicio: "2023-01-15", estado: "Activo" },
  { id: 3, titulo: "Calle 23 entre 2 y 102", tipo: "alquiler", valor: 50000, fechaInicio: "2023-01-15", estado: "Activo" },
  { id: 4, titulo: "Calle 23 entre 2 y 102", tipo: "alquiler", valor: 50000, fechaInicio: "2023-01-15", estado: "Activo" },
  { id: 5, titulo: "Calle 23 entre 2 y 102", tipo: "alquiler", valor: 50000, fechaInicio: "2023-01-15", estado: "Activo" },
]


export default function Component() {
  const [busqueda, setBusqueda] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [ordenar, setOrdenar] = useState('valor-asc')
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const contratosFiltrados = contratos
    .filter(contrato => 
      contrato.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
      (tipoFiltro === 'Todos' || contrato.tipo === tipoFiltro)
    )
    .sort((a, b) => {
      if (ordenar === 'valor-asc') return a.valor - b.valor
      if (ordenar === 'valor-desc') return b.valor - a.valor
      if (ordenar === 'fecha-asc') return new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime()
      if (ordenar === 'fecha-desc') return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime()
      return 0
    })

  const aplicarFiltros = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex h-screen">
      {/* Navbar para desktop */}
      <aside className="hidden md:flex flex-col w-64 p-4 border-r">
        <NavbarContent />
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 pb-20">
          {/* Menú hamburguesa para móviles */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <NavbarContent />
              </SheetContent>
            </Sheet>
          </div>

          <h1 className="text-2xl font-bold mb-4">Listado de Contratos</h1>
          
          <div className="flex flex-col gap-4 mb-4">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar contratos..."
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
                          <option value="Servicios">Servicios</option>
                          <option value="Licencia">Licencia</option>
                          <option value="Consultoría">Consultoría</option>
                          <option value="SLA">SLA</option>
                          <option value="Mantenimiento">Mantenimiento</option>
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
                        <option value="valor-asc">Valor: Menor a Mayor</option>
                        <option value="valor-desc">Valor: Mayor a Menor</option>
                        <option value="fecha-asc">Fecha: Más antiguo primero</option>
                        <option value="fecha-desc">Fecha: Más reciente primero</option>
                      </Select> */}
                    </div>
                  </div>
                  <Button onClick={aplicarFiltros}>Aplicar Filtros</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contratosFiltrados.map(contrato => (
              <Card key={contrato.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    {contrato.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Tipo:</strong> {contrato.tipo}</p>
                  <p><strong>Valor:</strong> €{contrato.valor.toLocaleString()}</p>
                  <p><strong>Fecha de inicio:</strong> {new Date(contrato.fechaInicio).toLocaleDateString()}</p>
                  <p><strong>Estado:</strong> {contrato.estado}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
                aria-label="Agregar Contrato"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>

            <CrearContrato setIsModalOpen={setIsModalOpen} />
          </Dialog>

         
        </div>
      </div>
    </div>
  )
}