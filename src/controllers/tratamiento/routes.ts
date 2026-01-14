// src/routes/TratamientosRoutes.ts
import { Router } from "express";
import { TratamientosController } from "./TratamientosController";

export class TratamientosRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TratamientosController();

    // POST /tratamientos
    router.post("/", controller.agregarTratamiento);

    return router;
  }
}
