// src/controllers/DoctoresController.ts
import { Request, Response } from "express";
import { DoctorService } from "../../services/DoctorServices";

export class DoctoresController {
  private readonly doctorService: DoctorService;

  constructor() {
    this.doctorService = new DoctorService();
  }

  /**
   * GET /doctores
   */
  listarDoctores = async (req: Request, res: Response) => {
    try {
      const doctores = await this.doctorService.listarDoctores();
      return res.status(200).json(doctores);
    } catch (error: any) {
      return res.status(500).json({
        message: "Error al listar doctores",
        error: error.message,
      });
    }
  };

  /**
   * POST /doctores
   * body: { Nombre, Apellido, Especialidad, Teléfono?, Email? }
   */
  agregarDoctor = async (req: Request, res: Response) => {
    try {
      const { Nombre, Apellido, Especialidad, Teléfono, Email } = req.body;

      if (!Nombre || !Apellido || !Especialidad) {
        return res.status(400).json({
          message: "Nombre, Apellido y Especialidad son requeridos",
        });
      }

      const doctorCreado = await this.doctorService.agregarDoctor({
        Nombre,
        Apellido,
        Especialidad,
        Teléfono,
        Email,
      });

      return res.status(201).json(doctorCreado);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message ?? "Error al agregar doctor",
      });
    }
  };
}
