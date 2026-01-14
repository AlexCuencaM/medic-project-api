// src/controllers/PacientesController.ts
import { Request, Response } from "express";
import { PacienteService } from "../../services/PacienteServices";

export class PacientesController {
  private readonly pacienteService: PacienteService;

  constructor() {
    this.pacienteService = new PacienteService();
  }

  /**
   * GET /pacientes
   */
  listarPacientes = async (req: Request, res: Response) => {
    try {
      const मरीज = await this.pacienteService.listarPacientes();
      return res.status(200).json(मरीज);
    } catch (error: any) {
      return res.status(500).json({
        message: "Error al listar pacientes",
        error: error.message,
      });
    }
  };

  /**
   * POST /pacientes
   * body: { Nombre, Apellido, Fecha_de_Nacimiento, Dirección, Teléfono?, Email? }
   */
  agregarPaciente = async (req: Request, res: Response) => {
    try {
      const {
        Nombre,
        Apellido,
        Fecha_de_Nacimiento,
        Dirección,
        Teléfono,
        Email,
      } = req.body;

      if (!Nombre || !Apellido || !Fecha_de_Nacimiento || !Dirección) {
        return res.status(400).json({
          message:
            "Nombre, Apellido, Fecha_de_Nacimiento y Dirección son requeridos",
        });
      }

      const pacienteCreado = await this.pacienteService.agregarPaciente({
        Nombre,
        Apellido,
        Fecha_de_Nacimiento: new Date(Fecha_de_Nacimiento),
        Dirección,
        Teléfono,
        Email,
      });

      return res.status(201).json(pacienteCreado);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message ?? "Error al agregar paciente",
      });
    }
  };
}
