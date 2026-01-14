import { prisma } from "../config/prisma";
import { ServiciosMedicosMapper } from "../mappers/ServiciosMedicosMapper";
import { Servicios_Médicos } from "../models/Servicio_medicos";

interface CrearServicioMedicoDTO {
  Nombre_del_Servicio: string;
  Descripción?: string;
  Costo: string; // dominio: string (Decimal)
}

export class ServiciosMedicosService {
  /**
   * Agregar un nuevo servicio médico
   */
  async agregarServicioMedico(data: CrearServicioMedicoDTO): Promise<Servicios_Médicos> {
    const creado = await prisma.servicios_Médicos.create({
      data: {
        Nombre_del_Servicio: data.Nombre_del_Servicio,
        Descripción: data.Descripción ?? "",
        Costo: Number(data.Costo), // Decimal
      },
    });

    return ServiciosMedicosMapper.toDomain(creado);
  }

  /**
   * Lista de servicios médicos
   */
  async listarServiciosMedicos(): Promise<Servicios_Médicos[]> {
    const servicios = await prisma.servicios_Médicos.findMany({
      orderBy: { Nombre_del_Servicio: "asc" },
    });

    return servicios.map(ServiciosMedicosMapper.toDomain);
  }
}
