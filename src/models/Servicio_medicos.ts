import { Tratamientos } from "./Tratamientos";

export class Servicios_Médicos {
  constructor(
    public readonly ID_Servicio: number,
    public Nombre_del_Servicio: string,
    public Descripción?: string,
    public Costo: string = "", // Recomendado: string para Decimal (evita errores de punto flotante)

    // Relación (opcional)
    public Tratamientos?: Tratamientos[]
  ) {}
}
