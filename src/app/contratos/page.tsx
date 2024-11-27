'use client'

import { useState, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Plus, FileText, Filter, Menu, Home, Building, LogOut } from 'lucide-react'

import Link from 'next/link';

import { Table, TableCell, TableBody, TableRow, TableHead, TableHeader } from '@/components/ui/table'

import { NavbarContent } from '@/components/ui/NavbarContent'

import CrearContrato from './CrearContrato'
import { IPV4 } from '../../../global'
import { Contrato } from '@/types/contrato'

export default function Component() {
  const [busqueda, setBusqueda] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [ordenar, setOrdenar] = useState('valor-asc')
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contratos, setContratos] = useState<Contrato[]>();

  useEffect(() => {
    const fetchContratos = async () => {
      const res = await fetch(`http://${IPV4}:4567/contratos`);
      const data = await res.json();
      setContratos(data);
    }
    fetchContratos();
  }, [])
  

  const aplicarFiltros = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex h-screen">
      <aside className="hidden md:flex flex-col w-64 p-4 border-r">
        <NavbarContent />
      </aside>

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

          <h1 className="text-2xl font-bold mb-4 mt-12">Listado de Contratos</h1>
          
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
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="ordenar" className="text-right">
                        Ordenar
                      </Label>
                    </div>
                  </div>
                  <Button onClick={aplicarFiltros}>Aplicar Filtros</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </div> */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propiedad</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                contratos?.map(contrato => (
                    <TableRow key={contrato.idContrato}>
                        <TableCell>{contrato.propiedad.ubicacion}</TableCell>
                        <TableCell>{contrato.fechaInicio}</TableCell>
                        <TableCell>{contrato.fechaFin}</TableCell>
                        <TableCell>
                          <Link href={`/contratos/${contrato.idContrato}`} className='bg-slate-200 p-2 rounded-md'>
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