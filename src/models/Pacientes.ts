import { Camas } from "./Camas";
import { Ingresos } from "./Ingresos";

export class Pacientes {
  constructor(
    public readonly ID_Paciente: number,
    public Nombre: string,
    public Apellido: string,
    public Fecha_de_Nacimiento: Date,
    public Dirección: string,
    public Teléfono?: string,
    public Email?: string,

    // Relación 1:1 (opcional) con Camas
    public Cama?: Camas | null,

    // Historial (opcional)
    public Ingresos?: Ingresos[]
  ) {}
}
