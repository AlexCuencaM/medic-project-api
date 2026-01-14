// src/infrastructure/mappers/ServiciosMedicosMapper.ts
import { Servicios_MédicosModel } from "../../generated/prisma/models";
import { Servicios_Médicos } from "../models/Servicio_medicos";

export class ServiciosMedicosMapper {
  static toDomain(prismaServicio: Servicios_MédicosModel): Servicios_Médicos {
    return new Servicios_Médicos(
      prismaServicio.ID_Servicio,
      prismaServicio.Nombre_del_Servicio,
      prismaServicio.Descripción ?? undefined,
      prismaServicio.Costo.toString() // Decimal -> string (dominio)
    );
  }

  static toPrisma(servicio: Servicios_Médicos) {
    return {
      Nombre_del_Servicio: servicio.Nombre_del_Servicio,
      Descripción: servicio.Descripción,
      // Prisma acepta string para Decimal en many setups; si prefieres Decimal.js, lo ajusto.
      Costo: servicio.Costo,
    };
  }
}
