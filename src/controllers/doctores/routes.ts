// src/routes/DoctoresRoutes.ts
import { Router } from "express";
import { DoctoresController } from "./DoctoresController";

export class DoctoresRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DoctoresController();

    // GET /doctores
    router.get("/", controller.listarDoctores);

    // POST /doctores
    router.post("/", controller.agregarDoctor);

    return router;
  }
}
