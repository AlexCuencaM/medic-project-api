import { Doctores } from "./Doctores";
import { Pacientes } from "./Pacientes";
import { Tratamientos } from "./Tratamientos";

export class Ingresos {
  constructor(
    public readonly ID_Ingreso: number,
    public ID_Paciente: number,
    public ID_Doctor: number,
    public Fecha_de_Ingreso: Date,
    public Fecha_de_Egreso: Date | null,
    public Diagnóstico: string,

    // Referencias opcionales
    public Paciente?: Pacientes,
    public Doctor?: Doctores,
    public Tratamientos?: Tratamientos[]
  ) {}
}
