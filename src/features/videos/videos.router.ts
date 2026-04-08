import express from "express";
import type { DbType } from "../../db/db";
import { constants as HTTP_CODES } from "http2";

export const getVideoRouter = (db: DbType) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_IMPLEMENTED);
  });
  router.post("/", (req, res) => {
    res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_IMPLEMENTED);
  });
  router.post("/:id", (req, res) => {
    res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_IMPLEMENTED);
  });
  router.put("/:id", (req, res) => {
    res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_IMPLEMENTED);
  });
  router.delete("/:id", (req, res) => {
    res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_IMPLEMENTED);
  });

  return router;
};
