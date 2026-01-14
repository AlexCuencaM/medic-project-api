import { Ingresos } from "./Ingresos";
import { Servicios_Médicos } from "./Servicio_medicos";

export class Tratamientos {
  constructor(
    public readonly ID_Tratamiento: number,
    public ID_Ingreso: number,
    public ID_Servicio: number,
    public Fecha_de_Tratamiento: Date,
    public Descripción?: string,

    // Referencias opcionales
    public Ingreso?: Ingresos,
    public Servicio?: Servicios_Médicos
  ) {}
}
