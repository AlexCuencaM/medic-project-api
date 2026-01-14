import { TratamientosModel } from "../../generated/prisma/models";
import { Tratamientos } from "../models/Tratamientos";

export class TratamientosMapper {
  static toDomain(prismaTratamiento: TratamientosModel): Tratamientos {
    return new Tratamientos(
      prismaTratamiento.ID_Tratamiento,
      prismaTratamiento.ID_Ingreso,
      prismaTratamiento.ID_Servicio,
      prismaTratamiento.Fecha_de_Tratamiento,
      prismaTratamiento.Descripción ?? undefined
    );
  }
}
