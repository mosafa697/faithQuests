import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";

import Controller from "@/utils/interfaces/controller.interface";
// import ErrorMiddleware from "@/middleware/error.middleware";

class App {
    public express: Application;
    public port: Number;
    constructor(controllers: Controller[], port: Number) {
        this.express = express();
        this.port = port;

        this.initMiddleware();
        this.initControllers(controllers);
        // this.initErrorHandling();
        this.initDBConnection();
    }

    private initMiddleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(helmet());
    }

    private initControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use("/api", controller.router);
        });
    }

    // private initErrorHandling(): void {
    //     this.express.use(ErrorMiddleware());
    // }

    private initDBConnection(): void {
        try {
            mongoose.connect(process.env.MONGO_PATH!);
            console.log('connected');
        } catch (error) {
            console.log('error');            
        }
    }

    /**
     * listen
     */
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;
