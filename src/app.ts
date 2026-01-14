import { ApiServer } from "./api-server";
import { envs } from "./config/envs";
import { AppRoutes } from "./controllers/AppRoutes";

(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const apiServer = new ApiServer({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
    await apiServer.start();
})();
