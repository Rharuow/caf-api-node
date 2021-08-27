import express from "express";
import cors from "cors";
import formData from "express-form-data";

import router from "./routes";

class App {
  app: any;

  constructor() {
    this.app = express();

    this.middleWare();
    this.routes();
  }

  middleWare() {
    const corsOpts = {
      origin: "*",

      methods: ["GET", "POST"],

      allowedHeaders: ["Content-Type"],
    };

    this.app.use(cors(corsOpts));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(formData.format());
    this.app.use(formData.stream());
    this.app.use(formData.union());
  }

  routes() {
    this.app.use("/v2", router);
  }
}

export default new App().app;
