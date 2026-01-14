import { prisma } from "../config/prisma";
import { CamasMapper } from "../mappers/CamasMappers";
import { Camas } from "../models/Camas";

export class CamasServices {

  /**
   * Asignar una cama a un paciente (1:1 estricto)
   */
  async asignarCamaAPaciente(
    ID_Cama: number,
    ID_Paciente: number
  ): Promise<Camas> {

    // Validar paciente existe
    const paciente = await prisma.pacientes.findUnique({
      where: { ID_Paciente },
      select: { ID_Paciente: true },
    });

    if (!paciente) {
      throw new Error("El paciente no existe");
    }

    // Validar cama disponible
    const cama = await prisma.camas.findUnique({
      where: { ID_Cama },
    });

    if (!cama) {
      throw new Error("La cama no existe");
    }

    if (cama.ID_Paciente !== null) {
      throw new Error("La cama no está disponible");
    }

    // Asignar cama (la restricción @unique evita doble asignación)
    const camaActualizada = await prisma.camas.update({
      where: { ID_Cama },
      data: {
        ID_Paciente,
        Estado: "ocupada",
      },
    });

    return CamasMapper.toDomain(camaActualizada);
  }

  /**
   * Lista de camas disponibles
   */
  async listarCamasDisponibles(): Promise<Camas[]> {
    const camas = await prisma.camas.findMany({
      where: {
        ID_Paciente: null,
        Estado: "disponible",
      },
      orderBy: {
        Número_de_Cama: "asc",
      },
    });

    return camas.map(CamasMapper.toDomain);
  }
}
