import React, { useState } from 'react'

import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label'; 
import { Input } from '@/components/ui/input'; 
import { Button} from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react'; 

type Persona = {
  id: string;
  nombre: string;
  tipo: string;
}

type Propiedad = {
  id: string;
  nombre: string;
  direccion: string;
}

const contratos = [
  { id: 1, titulo: "Contrato de Alquiler 1", tipo: "Alquiler", valor: 1000, fechaInicio: "2023-01-15", estado: "Activo" },
  { id: 2, titulo: "Contrato de Venta 1", tipo: "Venta", valor: 250000, fechaInicio: "2023-03-01", estado: "En proceso" },
  { id: 3, titulo: "Contrato de Alquiler 2", tipo: "Alquiler", valor: 1200, fechaInicio: "2023-02-10", estado: "Activo" },
]

// Datos de ejemplo para propiedades, inquilinos, propietarios y garantes
const propiedades = [
  { id: "1", nombre: "Apartamento en Madrid", direccion: "Calle Gran Vía 1, Madrid" },
  { id: "2", nombre: "Casa en Barcelona", direccion: "Passeig de Gràcia 1, Barcelona" },
  { id: "3", nombre: "Chalet en Valencia", direccion: "Avenida del Puerto 1, Valencia" },
  { id: "4", nombre: "Piso en Sevilla", direccion: "Calle Sierpes 1, Sevilla" },
  { id: "5", nombre: "Ático en Málaga", direccion: "Paseo Marítimo 1, Málaga" },
]

const personas = [
  { id: "1", nombre: "Juan Pérez", tipo: "inquilino" },
  { id: "2", nombre: "María García", tipo: "propietario" },
  { id: "3", nombre: "Carlos Rodríguez", tipo: "garante" },
  { id: "4", nombre: "Ana Martínez", tipo: "inquilino" },
  { id: "5", nombre: "Luis Sánchez", tipo: "propietario" },
]

interface CrearContratoProps {
  setIsModalOpen: (isOpen : boolean) => void;
}

const CrearContrato: React.FC<CrearContratoProps> = ({ setIsModalOpen }) => {
  const [busqueda, setBusqueda] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [ordenar, setOrdenar] = useState('valor-asc')
  const [isOpen, setIsOpen] = useState(false)
  const [busquedaPropiedad, setBusquedaPropiedad] = useState('')
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState<Propiedad | null>(null)
  const [busquedaInquilino, setBusquedaInquilino] = useState('')
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState<Persona | null>(null)
  const [busquedaPropietario, setBusquedaPropietario] = useState('')
  const [propietarioSeleccionado, setPropietarioSeleccionado] = useState<Persona | null>(null)
  const [busquedaGarante, setBusquedaGarante] = useState('')
  const [garanteSeleccionado, setGaranteSeleccionado] = useState<Persona | null>(null)
  const [isNuevoRegistroOpen, setIsNuevoRegistroOpen] = useState(false)
  const [tipoNuevoRegistro, setTipoNuevoRegistro] = useState<'propiedad' | 'inquilino' | 'propietario' | 'garante' | null>(null)

  const propiedadesFiltradas = propiedades.filter(propiedad =>
    propiedad.nombre.toLowerCase().includes(busquedaPropiedad.toLowerCase()) ||
    propiedad.direccion.toLowerCase().includes(busquedaPropiedad.toLowerCase())
  )

  const inquilinosFiltrados = personas.filter(persona =>
    persona.tipo === 'inquilino' && persona.nombre.toLowerCase().includes(busquedaInquilino.toLowerCase())
  )

  const propietariosFiltrados = personas.filter(persona =>
    persona.tipo === 'propietario' && persona.nombre.toLowerCase().includes(busquedaPropietario.toLowerCase())
  )

  const garantesFiltrados = personas.filter(persona =>
    persona.tipo === 'garante' && persona.nombre.toLowerCase().includes(busquedaGarante.toLowerCase())
  )

  const aplicarFiltros = () => {
    setIsOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aquí iría la lógica para crear el nuevo contrato
    console.log('Nuevo contrato creado', {
      propiedad: propiedadSeleccionada,
      inquilino: inquilinoSeleccionado,
      propietario: propietarioSeleccionado,
      garante: garanteSeleccionado
    })
    setIsModalOpen(false)
  }

  const handleSeleccionarPropiedad = (propiedad: Propiedad) => {
    setPropiedadSeleccionada(propiedad)
    setBusquedaPropiedad('')
  }

  const handleSeleccionarPersona = (persona: Persona, tipo: 'inquilino' | 'propietario' | 'garante') => {
    switch (tipo) {
      case 'inquilino':
        setInquilinoSeleccionado(persona)
        setBusquedaInquilino('')
        break
      case 'propietario':
        setPropietarioSeleccionado(persona)
        setBusquedaPropietario('')
        break
      case 'garante':
        setGaranteSeleccionado(persona)
        setBusquedaGarante('')
        break
    }
  }

  const handleNuevoRegistro = (tipo: 'propiedad' | 'inquilino' | 'propietario' | 'garante') => {
    setTipoNuevoRegistro(tipo)
    setIsNuevoRegistroOpen(true)
  }

  const handleGuardarNuevoRegistro = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aquí iría la lógica para guardar el nuevo registro
    console.log('Nuevo registro guardado', {
      tipo: tipoNuevoRegistro,
      // Otros datos del formulario
    })
    setIsNuevoRegistroOpen(false)
    setTipoNuevoRegistro(null)
  }

  const handleBorrarSeleccion = (tipo: 'propiedad' | 'inquilino' | 'propietario' | 'garante') => {
    switch (tipo) {
      case 'propiedad':
        setPropiedadSeleccionada(null);
        break;
      case 'inquilino':
        setInquilinoSeleccionado(null);
        break;
      case 'propietario':
        setPropietarioSeleccionado(null);
        break;
      case 'garante':
        setGaranteSeleccionado(null);
        break;
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <div className="px-4 py-6">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Contrato</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título del Contrato</Label>
            <Input id="titulo" required />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Contrato</Label>
            <RadioGroup defaultValue="alquiler">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alquiler" id="alquiler" />
                <Label htmlFor="alquiler">Alquiler</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="venta" id="venta" />
                <Label htmlFor="venta">Venta</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="valor">Valor</Label>
            <Input id="valor" type="number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
            <Input id="fechaInicio" type="date" required />
          </div>
          <div className="space-y-2">
            <Label>Inquilino</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar inquilino..."
                value={busquedaInquilino}
                onChange={(e) => setBusquedaInquilino(e.target.value)}
              />
              {busquedaInquilino && inquilinosFiltrados.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {inquilinosFiltrados.map((inquilino) => (
                    <li
                      key={inquilino.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSeleccionarPersona(inquilino, 'inquilino')}
                    >
                      {inquilino.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {inquilinoSeleccionado ? (
              <div className="mt-2 p-2 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{inquilinoSeleccionado.nombre}</p>
                </div>
                <Button onClick={() => handleBorrarSeleccion('inquilino')} type="button" variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleNuevoRegistro('inquilino')} type="button" variant="outline" className="mt-2">
                Agregar nuevo inquilino
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label>Propietario</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar propietario..."
                value={busquedaPropietario}
                onChange={(e) => setBusquedaPropietario(e.target.value)}
              />
              {busquedaPropietario && propietariosFiltrados.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {propietariosFiltrados.map((propietario) => (
                    <li
                      key={propietario.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSeleccionarPersona(propietario, 'propietario')}
                    >
                      {propietario.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {propietarioSeleccionado ? (
              <div className="mt-2 p-2 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{propietarioSeleccionado.nombre}</p>
                </div>
                <Button onClick={() => handleBorrarSeleccion('propietario')} type="button" variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleNuevoRegistro('propietario')} type="button" variant="outline" className="mt-2">
                Agregar nuevo propietario
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label>Garante</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar garante..."
                value={busquedaGarante}
                onChange={(e) => setBusquedaGarante(e.target.value)}
              />
              {busquedaGarante && garantesFiltrados.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {garantesFiltrados.map((garante) => (
                    <li
                      key={garante.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSeleccionarPersona(garante, 'garante')}
                    >
                      {garante.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {garanteSeleccionado ? (
              <div className="mt-2 p-2 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{garanteSeleccionado.nombre}</p>
                </div>
                <Button onClick={() => handleBorrarSeleccion('garante')} type="button" variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleNuevoRegistro('garante')} type="button" variant="outline" className="mt-2">
                Agregar nuevo garante
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label>Propiedad</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar propiedad..."
                value={busquedaPropiedad}
                onChange={(e) => setBusquedaPropiedad(e.target.value)}
              />
              {busquedaPropiedad && propiedadesFiltradas.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {propiedadesFiltradas.map((propiedad) => (
                    <li
                      key={propiedad.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSeleccionarPropiedad(propiedad)}
                    >
                      <div>{propiedad.nombre}</div>
                      <div className="text-sm text-gray-500">{propiedad.direccion}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {propiedadSeleccionada ? (
              <div className="mt-2 p-2 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{propiedadSeleccionada.nombre}</p>
                  <p className="text-sm text-gray-600">{propiedadSeleccionada.direccion}</p>
                </div>
                <Button onClick={() => handleBorrarSeleccion('propiedad')} type="button" variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleNuevoRegistro('propiedad')} type="button" variant="outline" className="mt-2">
                Agregar nueva propiedad
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion" />
          </div>
          <Button type="submit" className="w-full">Crear Contrato</Button>
        </form>
      </div>
    </DialogContent>
  )
}

export default CrearContrato