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

const personas = [
  { id: "1", nombre: "Juan Pérez", tipo: "inquilino" },
  { id: "2", nombre: "María García", tipo: "propietario" },
  { id: "3", nombre: "Carlos Rodríguez", tipo: "garante" },
  { id: "4", nombre: "Ana Martínez", tipo: "inquilino" },
  { id: "5", nombre: "Luis Sánchez", tipo: "propietario" },
]

interface CrearPropiedadProps {
  setIsModalOpen: (isOpen : boolean) => void;
}

const CrearPropiedad: React.FC<CrearPropiedadProps> = ({ setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [busquedaPropietario, setBusquedaPropietario] = useState('')
  const [propietarioSeleccionado, setPropietarioSeleccionado] = useState<Persona | null>(null)
  const [isNuevoRegistroOpen, setIsNuevoRegistroOpen] = useState(false)
  const [tipoNuevoRegistro, setTipoNuevoRegistro] = useState<'propietario' | null>(null)

  const propietariosFiltrados = personas.filter(persona =>
    persona.tipo === 'propietario' && persona.nombre.toLowerCase().includes(busquedaPropietario.toLowerCase())
  )

  const aplicarFiltros = () => {
    setIsOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aquí iría la lógica para crear el nuevo contrato
    console.log('Nuevo contrato creado', {
      propietario: propietarioSeleccionado,
    })
    setIsModalOpen(false)
  }

  const handleSeleccionarPropietario = (persona: Persona) => {
    setPropietarioSeleccionado(persona)
    setBusquedaPropietario('')
  }


  const handleNuevoRegistro = () => {
    // setTipoNuevoRegistro(tipo)
    // setIsNuevoRegistroOpen(true)
    console.log("Quiero crear propietario");
    
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

  const handleBorrarSeleccion = () => {
    setPropietarioSeleccionado(null);
  };

  // private Propietario propietario;
  // private Integer id;
  // private String ubicacion;
  // private String tipo;
  // private String destino;
  // private Integer ambientes;
  // private Integer banios;
  // private Integer mts_cuadrados;
  // private String Propietario_PERSONA_CUIL;

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <div className="px-4 py-6">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Contrato</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pb-6">
          {/* input direccion */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Direccion</Label>
            <Input id="direccion" required />
          </div>

          {/* tipo propiedad */}
          <div className="space-y-2">
            <Label>Tipo de Propiedad</Label>
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

          {/* Ambientes */}
          <div className="space-y-2">
            <Label htmlFor="ambientes">Ambientes</Label>
            <Input id="ambientes" type="number" required />
          </div>

          {/* Banios */}
          <div className="space-y-2">
            <Label htmlFor="banios">Banios</Label>
            <Input id="banios" type="number" required />
          </div>

          {/* Mts2 */}
          <div className="space-y-2">
            <Label htmlFor="mtsCuadrados">m2</Label>
            <Input id="mtsCuadrados" type="number" required />
          </div>

          {/* seleccionar propietario */}
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
                      onClick={() => handleSeleccionarPropietario(propietario)}
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
                <Button onClick={() => handleBorrarSeleccion()} type="button" variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleNuevoRegistro()} type="button" variant="outline" className="mt-2">
                Agregar nuevo Propietario
              </Button>
            )}
          </div>
          <Button type="submit" className="w-full">Crear Propiedad</Button>
        </form>
      </div>
    </DialogContent>
  );
}
export default CrearPropiedad;