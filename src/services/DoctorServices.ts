// src/services/DoctorService.ts
import { prisma } from "../config/prisma";
import { Doctores } from "../models/Doctores";

interface CrearDoctorDTO {
  Nombre: string;
  Apellido: string;
  Especialidad: string;
  Teléfono?: string;
  Email?: string;
}

export class DoctorService {

  /**
   * Listar todos los doctores
   */
  async listarDoctores(): Promise<Doctores[]> {
    const results = await prisma.doctores.findMany({
      orderBy: {
        Apellido: "asc",
      },
    });
    const doctores = results.map((r) =>
      new Doctores(
        // Prisma model fields
        r.ID_Doctor,
        r.Nombre,
        r.Apellido,
        r.Especialidad,
        // use bracket access for accented property name
        r.Teléfono ?? "",
        r.Email ?? ""
      )
    );
    return doctores;
  }

  /**
   * Agregar un nuevo doctor
   */
  async agregarDoctor(data: CrearDoctorDTO): Promise<Doctores> {
    const result = await prisma.doctores.create({
      data: {
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Especialidad: data.Especialidad,
        Teléfono: data.Teléfono ?? "",
        Email: data.Email ?? "",
      },
    });
    const doctor = new Doctores(
      result.ID_Doctor,
      result.Nombre,
      result.Apellido,
      result.Especialidad,
      result.Teléfono ?? "",
      result.Email ?? ""
    );

    return doctor;
  }
}
