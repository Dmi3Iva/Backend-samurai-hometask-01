import express from "express";
import { getTestingRouter } from "./features/testing/testing.router";
import { ROUTERS } from "./constants/index";
import { getVideoRouter } from "./features/videos/videos.router";
import { db } from "./db/db";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "h01 API - V1",
      version: "1.0.0",
    },
  },
  apis: ["./src/**/*.swagger.yml"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/hometask_01/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export const app = express();

app.use(express.json());

app.use(ROUTERS.VIDEOS, getVideoRouter(db));
app.use(ROUTERS.TESTINGS, getTestingRouter(db));

app.get("/", (req, res) => {
  return res.send("Hello, samurai");
});

setupSwagger(app);
