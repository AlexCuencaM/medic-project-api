import { prisma } from "../config/prisma";
import { TratamientosMapper } from "../mappers/TratamientosMapper";
import { Tratamientos } from "../models/Tratamientos";

interface CrearTratamientoDTO {
  ID_Ingreso: number;
  ID_Servicio: number;
  Fecha_de_Tratamiento: Date;
  Descripción?: string;
}

export class TratamientosServices {
  /**
   * Agregar un nuevo tratamiento
   */
  async agregarTratamiento(data: CrearTratamientoDTO): Promise<Tratamientos> {
    // Validaciones mínimas
    const [ingreso, servicio] = await Promise.all([
      prisma.ingresos.findUnique({
        where: { ID_Ingreso: data.ID_Ingreso },
        select: { ID_Ingreso: true },
      }),
      prisma.servicios_Médicos.findUnique({
        where: { ID_Servicio: data.ID_Servicio },
        select: { ID_Servicio: true },
      }),
    ]);

    if (!ingreso) throw new Error("El ingreso no existe");
    if (!servicio) throw new Error("El servicio médico no existe");

    const creado = await prisma.tratamientos.create({
      data: {
        ID_Ingreso: data.ID_Ingreso,
        ID_Servicio: data.ID_Servicio,
        Fecha_de_Tratamiento: data.Fecha_de_Tratamiento,
        Descripción: data.Descripción ?? "",
      },
    });

    return TratamientosMapper.toDomain(creado);
  }
}
