// src/controllers/CamasController.ts
import { Request, Response } from "express";
import { CamasServices } from "../../services/CamasServices";
export class CamasController {
  private readonly camasService: CamasServices;

  constructor() {
    this.camasService = new CamasServices();
  }

  /**
   * GET /camas/disponibles
   */
  listarCamasDisponibles = async (req: Request, res: Response) => {
    try {
      const camas = await this.camasService.listarCamasDisponibles();
      return res.status(200).json(camas);
    } catch (error: any) {
      return res.status(500).json({
        message: "Error al listar camas disponibles",
        error: error.message,
      });
    }
  };

  /**
   * POST /camas/asignar
   * body: { ID_Cama, ID_Paciente }
   */
  asignarCamaAPaciente = async (req: Request, res: Response) => {
    try {
      const { ID_Cama, ID_Paciente } = req.body;

      if (!ID_Cama || !ID_Paciente) {
        return res.status(400).json({
          message: "ID_Cama y ID_Paciente son requeridos",
        });
      }

      const cama = await this.camasService.asignarCamaAPaciente(
        Number(ID_Cama),
        Number(ID_Paciente)
      );

      return res.status(200).json(cama);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message ?? "Error al asignar cama",
      });
    }
  };
}
