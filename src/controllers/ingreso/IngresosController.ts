// src/controllers/IngresosController.ts
import { Request, Response } from "express";
import { IngresosServices } from "../../services/IngresosServices";

export class IngresosController {
  private readonly ingresosService: IngresosServices;

  constructor() {
    this.ingresosService = new IngresosServices();
  }

  /**
   * POST /ingresos
   * body: { ID_Paciente, ID_Doctor, Fecha_de_Ingreso, Fecha_de_Egreso?, Diagnóstico }
   */
  agregarIngreso = async (req: Request, res: Response) => {
    try {
      const {
        ID_Paciente,
        ID_Doctor,
        Fecha_de_Ingreso,
        Fecha_de_Egreso,
        Diagnóstico,
      } = req.body;

      if (!ID_Paciente || !ID_Doctor || !Fecha_de_Ingreso || !Diagnóstico) {
        return res.status(400).json({
          message:
            "ID_Paciente, ID_Doctor, Fecha_de_Ingreso y Diagnóstico son requeridos",
        });
      }

      const ingreso = await this.ingresosService.agregarIngreso({
        ID_Paciente: Number(ID_Paciente),
        ID_Doctor: Number(ID_Doctor),
        Fecha_de_Ingreso: new Date(Fecha_de_Ingreso),
        Fecha_de_Egreso: Fecha_de_Egreso
          ? new Date(Fecha_de_Egreso)
          : null,
        Diagnóstico,
      });

      return res.status(201).json(ingreso);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message ?? "Error al agregar ingreso",
      });
    }
  };

  /**
   * GET /ingresos/informe?anio=2026&mes=1
   */
  informeIngresosPorMes = async (req: Request, res: Response) => {
    try {
      const anio = Number(req.query.anio);
      const mes = Number(req.query.mes);

      if (!anio || !mes) {
        return res.status(400).json({
          message: "anio y mes son requeridos",
        });
      }

      const ingresos = await this.ingresosService.informeIngresosPorMes({
        anio,
        mes,
      });

      return res.status(200).json(ingresos);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message ?? "Error al generar informe",
      });
    }
  };
}
