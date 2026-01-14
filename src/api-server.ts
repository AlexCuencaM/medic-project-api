import express, { Router } from "express";
import cors from "cors";
var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
interface options{
    routes: Router;
    port: number;
}

export class ApiServer{
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    constructor({routes, port}: options){
        this.port = port;
        this.routes = routes;
    }
    async start(){
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: false }) ); // x-www-form-urlencoded
        this.app.use(cors(corsOptions));
        this.app.use( this.routes );
        this.app.listen(this.port, () => {
          console.log(`Server running on http://localhost:${ this.port }`);
        });
    }
}
