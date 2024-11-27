import { Propietario } from "./propietario";
import { Imagen } from "./imagen";

export interface Propiedad {
  id: number;
  ubicacion: string;
  tipo: string;
  destino: string;
  ambientes: number;
  banios: number;
  mts_cuadrados_cubiertos: number;
  descripcion: string;
  Propietario_PERSONA_CUIL: string;
  Propietario: Propietario;
  Imagenes: Imagen[];
}