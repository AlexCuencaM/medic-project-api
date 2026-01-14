import { prisma } from "../config/prisma";
import { IngresosMapper } from "../mappers/IngresosMapper";
import { Ingresos } from "../models/Ingresos";

interface CrearIngresoDTO {
  ID_Paciente: number;
  ID_Doctor: number;
  Fecha_de_Ingreso: Date;
  Fecha_de_Egreso?: Date | null;
  Diagnóstico: string;
}

export class IngresosServices {
  /**
   * Agregar un nuevo ingreso
   */
  async agregarIngreso(data: CrearIngresoDTO): Promise<Ingresos> {
    // Validaciones mínimas (opcional pero útil)
    const [paciente, doctor] = await Promise.all([
      prisma.pacientes.findUnique({ where: { ID_Paciente: data.ID_Paciente }, select: { ID_Paciente: true } }),
      prisma.doctores.findUnique({ where: { ID_Doctor: data.ID_Doctor }, select: { ID_Doctor: true } }),
    ]);

    if (!paciente) throw new Error("El paciente no existe");
    if (!doctor) throw new Error("El doctor no existe");

    const creado = await prisma.ingresos.create({
      data: {
        ID_Paciente: data.ID_Paciente,
        ID_Doctor: data.ID_Doctor,
        Fecha_de_Ingreso: data.Fecha_de_Ingreso,
        Fecha_de_Egreso: data.Fecha_de_Egreso ?? null,
        Diagnóstico: data.Diagnóstico,
      },
    });

    return IngresosMapper.toDomain(creado);
  }

  /**
   * Informe de ingresos por mes
   *
   * Retorna una lista de Ingresos (modelo de dominio) que caen dentro del mes indicado.
   * (Si necesitas un "reporte agregado" con conteo por mes, dímelo y lo ajusto.)
   */
  async informeIngresosPorMes(params: {
    anio: number; // e.g. 2026
    mes: number;  // 1-12
  }): Promise<Ingresos[]> {
    const { anio, mes } = params;

    if (mes < 1 || mes > 12) {
      throw new Error("El mes debe estar entre 1 y 12");
    }

    // Rango [inicioMes, inicioSiguienteMes)
    const inicioMes = new Date(Date.UTC(anio, mes - 1, 1, 0, 0, 0));
    const inicioSiguienteMes = new Date(Date.UTC(anio, mes, 1, 0, 0, 0));

    const ingresos = await prisma.ingresos.findMany({
      where: {
        Fecha_de_Ingreso: {
          gte: inicioMes,
          lt: inicioSiguienteMes,
        },
      },
      orderBy: {
        Fecha_de_Ingreso: "asc",
      },
    });

    return ingresos.map(IngresosMapper.toDomain);
  }
}
