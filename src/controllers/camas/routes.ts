// src/routes/CamasRoutes.ts
import { Router } from "express";
import { CamasController } from "./CamasController";
export class CamasRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CamasController();

    // GET /camas/disponibles
    router.get("/disponibles", controller.listarCamasDisponibles);

    // POST /camas/asignar
    router.post("/asignar", controller.asignarCamaAPaciente);

    return router;
  }
}
