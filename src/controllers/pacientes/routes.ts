// src/routes/PacientesRoutes.ts
import { Router } from "express";
import { PacientesController } from "./PacientesController";

export class PacientesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PacientesController();

    // GET /pacientes
    router.get("/", controller.listarPacientes);

    // POST /pacientes
    router.post("/", controller.agregarPaciente);

    return router;
  }
}
