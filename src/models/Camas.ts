import { Pacientes } from "./Pacientes";

export class Camas {
  constructor(
    public readonly ID_Cama: number,
    public Número_de_Cama: number,
    public Tipo_de_Cama: string,
    public Estado: string,

    // FK única en DB (1:1 estricto)
    public ID_Paciente?: number | null,

    // Referencia opcional
    public Paciente?: Pacientes | null
  ) {}
}
