// src/controllers/TratamientosController.ts
import { Request, Response } from "express";
import { TratamientosServices } from "../../services/TratamientosServices";

export class TratamientosController {
  private readonly tratamientosService: TratamientosServices;

  constructor() {
    this.tratamientosService = new TratamientosServices();
  }

  /**
   * POST /tratamientos
   * body: { ID_Ingreso, ID_Servicio, Fecha_de_Tratamiento, Descripción? }
   */
  agregarTratamiento = async (req: Request, res: Response) => {
    try {
      const {
        ID_Ingreso,
        ID_Servicio,
        Fecha_de_Tratamiento,
        Descripción,
      } = req.body;

      if (!ID_Ingreso || !ID_Servicio || !Fecha_de_Tratamiento) {
        return res.status(400).json({
          message:
            "ID_Ingreso, ID_Servicio y Fecha_de_Tratamiento son requeridos",
        });
      }

      const tratamiento = await this.tratamientosService.agregarTratamiento({
        ID_Ingreso: Number(ID_Ingreso),
        ID_Servicio: Number(ID_Servicio),
        Fecha_de_Tratamiento: new Date(Fecha_de_Tratamiento),
        Descripción,
      });

      return res.status(201).json(tratamiento);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message ?? "Error al agregar tratamiento",
      });
    }
  };
}
