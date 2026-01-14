import { Router } from "express";
import { CamasRoutes } from "./camas/routes";
import { DoctoresRoutes } from "./doctores/routes";
import { IngresosRoutes } from "./ingreso/routes";
import { PacientesRoutes } from "./pacientes/routes";
import { TratamientosRoutes } from "./tratamiento/routes";
export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use("/camas", CamasRoutes.routes);
        router.use("/doctores", DoctoresRoutes.routes);
        router.use("/ingresos", IngresosRoutes.routes);
        router.use("/pacientes", PacientesRoutes.routes);
        router.use("/tratamientos", TratamientosRoutes.routes);
        return router;
    }
}