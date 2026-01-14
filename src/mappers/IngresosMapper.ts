import { Ingresos } from "../models/Ingresos";
import { IngresosModel } from '../../generated/prisma/models/Ingresos';

export class IngresosMapper {
  static toDomain(prismaIngreso: IngresosModel): Ingresos {
    return new Ingresos(
      prismaIngreso.ID_Ingreso,
      prismaIngreso.ID_Paciente,
      prismaIngreso.ID_Doctor,
      prismaIngreso.Fecha_de_Ingreso,
      prismaIngreso.Fecha_de_Egreso ?? null,
      prismaIngreso.Diagnóstico
    );
  }
}
