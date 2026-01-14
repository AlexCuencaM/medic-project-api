// src/routes/IngresosRoutes.ts
import { Router } from "express";
import { IngresosController } from "./IngresosController";

export class IngresosRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new IngresosController();

    // POST /ingresos
    router.post("/", controller.agregarIngreso);

    // GET /ingresos/informe
    router.get("/informe", controller.informeIngresosPorMes);

    return router;
  }
}
