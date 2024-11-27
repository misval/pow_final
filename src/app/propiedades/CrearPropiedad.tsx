import React, { useState } from 'react'

import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label'; 
import { Input } from '@/components/ui/input'; 
import { Button} from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react'; 
import { IPV4 } from '../../../global';

type Persona = {
  id: string;
  nombre: string;
  tipo: string;
  cuil: string;
}

const personas = [
  { id: "1", nombre: "Juan Pérez", tipo: "inquilino", cuil: "20441194057" },
  { id: "2", nombre: "María García", tipo: "propietario", cuil: "20441194057"},
  { id: "3", nombre: "Carlos Rodríguez", tipo: "garante", cuil: "20441194057"},
  { id: "4", nombre: "Ana Martínez", tipo: "inquilino", cuil: "20441194057"},
  { id: "5", nombre: "Luis Sánchez", tipo: "propietario", cuil: "20441194057"},
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
  const [destinoPropiedad, setDestinoPropiedad] = useState('alquiler'); 
  const [tipoPropiedad, setTipoPropiedad] = useState('departamento');

  const propietariosFiltrados = personas.filter(persona =>
    persona.tipo === 'propietario' && persona.nombre.toLowerCase().includes(busquedaPropietario.toLowerCase())
  )

  const aplicarFiltros = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = [
      {
        ubicacion: formData.get("ubicacion") as string,
        tipo: formData.get("tipoPropiedad") as string,
        destino: formData.get("destinoPropiedad") as string,
        ambientes: Number(formData.get("ambientes")),
        banios: Number(formData.get("banios")),
        mts_cuadrados_cubiertos: Number(formData.get("mts2C")),
        mts_cuadrados_descubiertos: Number(formData.get("mts2D")),
        precio_venta: Number(formData.get("precioVenta")),
        precio_alquiler: Number(formData.get("precioAlquiler")),
        expensas: Number(formData.get("expensas")),
        descripcion: formData.get("descripcion") as string,
        Propietario_PERSONA_CUIL: formData.get("cuilPropietario")
      },
      {
        URL: formData.get("imagen") as string 
      }    
    ]

    const bodyData = JSON.stringify(data);
    
    try {
      const response = await fetch(`http://${IPV4}:4567/propiedad`, {
        method: "POST",
        body: bodyData
      });
  
      console.log(response.status);
      

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
  
      const result = await response.json();
      alert("Propiedad creada exitosamente");
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Error al crear la propiedad");
    }

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

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <div className="px-4 py-6">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Contrato</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-6">
          {/* input direccion */}
          <div className="space-y-2">
            <Label htmlFor="ubicacion">Direccion</Label>
            <Input id="ubicacion" name='ubicacion' required />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Propiedad</Label>
            <RadioGroup 
              value={tipoPropiedad}  
              onValueChange={(value) => setTipoPropiedad(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="departamento" id="departamento" />
                <Label htmlFor="departamento" >Departamento</Label>
                <RadioGroupItem value="casa" id="casa" />
                <Label htmlFor="casa">Casa</Label>
                <RadioGroupItem value="local" id="local" />
                <Label htmlFor="venta">Local</Label>
                <RadioGroupItem value="salon" id="salon" />
                <Label htmlFor="salon">Salon</Label>
              </div>
            </RadioGroup>

            <Input type="hidden" name="tipoPropiedad" value={tipoPropiedad} />
          </div>

          {/* tipo propiedad */}
          <div className="space-y-2">
            <Label>Destino</Label>
            <RadioGroup 
              value={destinoPropiedad}
              onValueChange={(value) => setDestinoPropiedad(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alquiler" id="alquiler" />
                <Label htmlFor="alquiler">Alquiler</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="venta" id="venta" />
                <Label htmlFor="venta">Venta</Label>
              </div>
            </RadioGroup>

            <Input type="hidden" name="destinoPropiedad" value={destinoPropiedad} />
          </div>

          {/* Ambientes */}
          <div className="space-y-2">
            <Label htmlFor="ambientes">Ambientes</Label>
            <Input id="ambientes" name="ambientes" type="number" required />
          </div>

          {/* Banios */}
          <div className="space-y-2">
            <Label htmlFor="banios">Baños</Label>
            <Input id="banios" type="number" name='banios' required />
          </div>

          {/* Banios */}
          <div className="space-y-2">
            <Label htmlFor="precioVenta">Precio Venta</Label>
            <Input id="precioVenta" type="number" name='precioVenta' required />
          </div>

          {/* Banios */}
          <div className="space-y-2">
            <Label htmlFor="precioAlquiler">Precio Alquiler</Label>
            <Input id="precioAlquiler" type="number" name='precioAlquiler' required />
          </div>

           {/* Expensas */}
          <div className="space-y-2">
            <Label htmlFor="expensas">Expensas</Label>
            <Input id="expensas" type="number" name='expensas' required />
          </div>

          {/* Mts2 */}
          <div className="space-y-2">
            <Label htmlFor="mtsCuadradosCubiertos">Metros Cuadrados Cubiertos</Label>
            <Input id="mtsCuadradosCubiertos" type="number" name='mts2C' required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mtsCuadradosDescubiertos">Metros Cuadrados Descubiertos</Label>
            <Input id="mtsCuadradosDescubiertos" type="number" name='mts2D' required />
          </div>

          {/* Descripcion */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion" name='descripcion' required/>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="imagen">Imagenes</Label>
            <Input id="imagen" type="string" name='imagen'/>
          </div>

          {/* seleccionar propietario */}
          {/* <div className="space-y-2">
            <Label>Propietario</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar propietario..."
                value={busquedaPropietario || ''}
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
            )} */}

            <Input type="string" name="cuilPropietario" id='cuilPropietario'/>
          {/* </div> */}


          <Button type="submit" className="w-full">Crear Propiedad</Button>
        </form>
      </div>
    </DialogContent>
  );
}
export default CrearPropiedad;