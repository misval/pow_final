import React, { useState, useEffect } from 'react'

import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label'; 
import { Input } from '@/components/ui/input'; 
import { Button} from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react'; 

import { Propiedad } from '@/types/propiedad';
import { IPV4 } from '../../../global';

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
  const [isNuevoRegistroOpen, setIsNuevoRegistroOpen] = useState(false)
  const [tipoNuevoRegistro, setTipoNuevoRegistro] = useState<'propiedad' | 'inquilino' | 'propietario' | 'garante' | null>(null)
  const [propiedades, setPropiedades] = useState<Propiedad[] | null>()

  useEffect(() => {
    const fetchPropiedades = async () => {
      const res = await fetch(`http://${IPV4}:4567/propiedades`);
      const data: Propiedad[] = await res.json();
      setPropiedades(data);
    } 
    fetchPropiedades();
  }, [])
  

  const propiedadesFiltradas = propiedades?.filter(propiedad =>
    propiedad.ubicacion.toLowerCase().includes(busquedaPropiedad.toLowerCase())
  )
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const garante = {
      CUIL: formData.get("cuilGarante"),
      DNI: formData.get("dniGarante"),
      nombre: formData.get("nombreGarante"),
      email: formData.get("emailGarante"),
      fechaNacimiento: formData.get("fechaNacimientoGarante"),
      ingresos: Number(formData.get("ingresosGarante")),
      trabajo: formData.get("trabajoGarante"),
      emailTrabajo: formData.get("emailTrabajoGarante"),
    }

    const inquilino = {
      CUILInquilino: formData.get("cuilInquilino"),
      DNIInquilino: formData.get("dniInquilino"),
      nombreInquilino: formData.get("nombreInquilino"),
      emailInquilino: formData.get("emailInquilino"),
      fechaNacimientoInquilino: formData.get("fechaDeNacimientoInquilino"),
      mascotas: formData.get("mascotasInquilino"),
      empresaTrabajoInquilino: formData.get("empresaInquilino"),
      cantidadIntegrantes: Number(formData.get("integrantesInquilino")),
      ingresosInquilino: Number(formData.get("ingresosInquilino"))
    }

    const data = {
      garante: garante,
      inquilino: inquilino,
      fechaInicio: formData.get("fechaInicio"),
      fechaFin: formData.get("fechaFin"),
      idPropiedad: formData.get("idPropiedad")
    }

    const bodyData = JSON.stringify(data);
    
    try {
      const response = await fetch(`http://${IPV4}:4567/contrato`, {
        method: "POST",
        body: bodyData
      });
  
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
  
      const result = await response.json();
      alert("Contrato creado exitosamente");
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Error al crear la propiedad");
    }

    setIsModalOpen(false)
  }

  const handleSeleccionarPropiedad = (propiedad: Propiedad) => {
    setPropiedadSeleccionada(propiedad)
    setBusquedaPropiedad('')
  }

  const handleNuevoRegistro = (tipo: 'propiedad' | 'inquilino' | 'propietario' | 'garante') => {
    setTipoNuevoRegistro(tipo)
    setIsNuevoRegistroOpen(true)
  }

  const handleBorrarSeleccion = (tipo: 'propiedad' | 'inquilino' | 'propietario' | 'garante') => {
    switch (tipo) {
      case 'propiedad':
        setPropiedadSeleccionada(null);
        break;
      case 'inquilino':
        // setInquilinoSeleccionado(null);
        break;
      case 'propietario':
        // setPropietarioSeleccionado(null);
        break;
      case 'garante':
        // setGaranteSeleccionado(null);
        break;
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <div className="px-4 py-6">
        
        <DialogHeader>
          <DialogTitle>Crear Nuevo Contrato</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
            <Input id="fechaInicio" name='fechaInicio' type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fechaFin">Fecha de Fin</Label>
            <Input id="fechaFin" name='fechaFin' type="date" required />
          </div>


          {/* DATOS DEL INQUILINO */}

          <div className="space-y-2">
            <Label>CUIL del Inquilino:</Label>
            <Input id='cuilInquilino' name='cuilInquilino' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>DNI del Inquilino:</Label>
            <Input id='dniInquilino' name='dniInquilino' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Nombre del Inquilino: </Label>
            <Input id='nombreInquilino' name='nombreInquilino' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Email del Inquilino: </Label>
            <Input id='emailInquilino' name='emailInquilino' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Fecha Nacimiento del Inquilino: </Label>
            <Input id='fechaDeNacimientoInquilino' name='fechaDeNacimientoInquilino' type='date'/>
          </div>

          <div className="space-y-2">
            <Label>Mascotas Inquilino: </Label>
            <Input id='mascotasInquilino' name='mascotasInquilino' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Empresa donde trabaja el inquilino:</Label>
            <Input id='empresaInquilino' name='empresaInquilino' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Cantidad de integrantes de la propiedad: </Label>
            <Input id='integrantesInquilino' name='integrantesInquilino' type='number'/>
          </div>

          <div className="space-y-2">
            <Label>Ingresos del inquilino: </Label>
            <Input id='ingresosInquilino' name='ingresosInquilino' type='number'/>
          </div>

          {/* DATOS GARANTE */}

          <div className="space-y-2">
            <Label>CUIL del garante:</Label>
            <Input id='cuilGarante' name='cuilGarante' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>DNI del garante:</Label>
            <Input id='dniGarante' name='dniGarante' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Nombre del garante:</Label>
            <Input id='nombreGarante' name='nombreGarante' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Email del garante:</Label>
            <Input id='emailGarante' name='emailGarante' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Fecha de nacimiento del garante:</Label>
            <Input id='fechaNacimientoGarante' name='fechaNacimientoGarante' type='date'/>
          </div>

          <div className="space-y-2">
            <Label>Ingresos del garante:</Label>
            <Input id='ingresosGarante' name='ingresosGarante' type='number'/>
          </div>

          <div className="space-y-2">
            <Label>Trabajo del garante:</Label>
            <Input id='trabajoGarante' name='trabajoGarante' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Email de trabajo del garante:</Label>
            <Input id='emailTrabajoGarante' name='emailTrabajoGarante' type='text'/>
          </div>

          <div className="space-y-2">
            <Label>Propiedad</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar propiedad..."
                value={busquedaPropiedad || propiedadSeleccionada?.ubicacion}
                onChange={(e) => setBusquedaPropiedad(e.target.value)}
                required
              />
              {busquedaPropiedad && (propiedadesFiltradas?.length ? propiedadesFiltradas.length > 0 : false) && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {propiedadesFiltradas?.map((propiedad) => (
                    <li
                      key={propiedad.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSeleccionarPropiedad(propiedad)}
                    >
                      <div>{propiedad.ubicacion}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {propiedadSeleccionada ? (
              <div className="mt-2 p-2 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{propiedadSeleccionada.ubicacion}</p>
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

            <Input type="hidden" name="idPropiedad" value={propiedadSeleccionada?.id} />
          </div>
          <Button type="submit" className="w-full">Crear Contrato</Button>
        </form>
      </div>
    </DialogContent>
  )
}

export default CrearContrato