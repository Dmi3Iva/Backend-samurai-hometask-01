import { DbType } from "@/db/db";
import express from "express";
import type { Router } from "express";
import { constants as HTTP_CODES } from "http2";

export const getTestingRouter = (db: DbType): Router => {
  const router = express.Router();

  router.delete("/all-data", (req, res) => {
    db.videos = [];

    res.sendStatus(HTTP_CODES.HTTP_STATUS_NO_CONTENT);
  });

  return router;
};
