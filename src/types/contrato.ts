import { Propiedad } from "./propiedad";
import { Garante } from "./garante";
import { Inquilino } from "./inquilino";

export interface Contrato {
  idContrato: number;
  propiedad: Propiedad;
  garantes: Garante[];
  inquilino: Inquilino;
  fechaInicio: string;
  fechaFin: string;
}