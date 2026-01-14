// src/services/PacienteService.ts

import { prisma } from "../config/prisma";
import { Pacientes } from "../models/Pacientes";

interface CrearPacienteDTO {
  Nombre: string;
  Apellido: string;
  Fecha_de_Nacimiento: Date;
  Dirección: string;
  Teléfono?: string;
  Email?: string;
}

export class PacienteService {

  /**
   * Listar todos los pacientes
   */
  async listarPacientes(): Promise<Pacientes[]> {
    const results = await prisma.pacientes.findMany({
      orderBy: {
        Apellido: "asc",
      },
    });

    const pacientes = results.map((r) =>
      new Pacientes(
        r.ID_Paciente,
        r.Nombre,
        r.Apellido,
        r.Fecha_de_Nacimiento,
        r.Dirección,
        r.Teléfono ?? "",
        r.Email ?? "",
      )
    );

    return pacientes;
  }

  /**
   * Agregar un nuevo paciente
   */
  async agregarPaciente(data: CrearPacienteDTO): Promise<Pacientes> {
    const result = await prisma.pacientes.create({
      data: {
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Fecha_de_Nacimiento: data.Fecha_de_Nacimiento,
        Dirección: data.Dirección,
        Teléfono: data.Teléfono ?? "",
        Email: data.Email ?? "",
      },
    });
    const paciente = new Pacientes(
      result.ID_Paciente,
      result.Nombre,
      result.Apellido,
      result.Fecha_de_Nacimiento,
      result.Dirección,
      result.Teléfono ?? "",
      result.Email ?? "",
    );

    return paciente;
  }
}
