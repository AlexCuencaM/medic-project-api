import { Camas } from "../models/Camas";
import { CamasModel } from '../../generated/prisma/models/Camas';

export class CamasMapper {
  static toDomain(prismaCama: CamasModel ): Camas {
    return new Camas(
      prismaCama.ID_Cama,
      prismaCama.Número_de_Cama,
      prismaCama.Tipo_de_Cama,
      prismaCama.Estado,
      prismaCama.ID_Paciente ?? null
    );
  }
}
