import express from "express";
import type { DbType, VideoType } from "../../db/db";
import { constants as HTTP_CODES } from "http2";
import { CreateVideoInputModel, VideoViewModel } from "./models";
import { RequestWithBody, RequestWithParams } from "@/types";
import {
  validateCreateVideoInputModel,
  validateUpdateVideoInputModel,
} from "./models/validate-create-video-input-model";
import { IErrorMessageResponse } from "./models/error-messages";

const mapVideoDtoToView = (data: VideoType): VideoViewModel => ({
  ...data,
});

export const getVideoRouter = (db: DbType) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const result = db.videos.map(mapVideoDtoToView);

    res.json(result);
  });
  router.get("/:id", (req: RequestWithParams<number>, res) => {
    const video = db.videos.find((v) => v.id === Number(req.params.id));
    if (video === undefined) {
      res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
    }

    const videoView = mapVideoDtoToView(video);
    res.json(videoView);
  });
  router.post("/", (req: RequestWithBody<CreateVideoInputModel>, res) => {
    const data = req.body;

    const errors = validateCreateVideoInputModel(data);
    if (errors.length) {
      const errorResponse: IErrorMessageResponse = {
        errorsMessages: errors,
      };
      return res.status(HTTP_CODES.HTTP_STATUS_BAD_REQUEST).json(errorResponse);
    }

    const id = db.videos.length;
    const createdAt = new Date().toISOString();
    let date = new Date();
    date.setDate(date.getDate() + 1);

    const publicationDate = date;
    const createVideoInputModel: VideoType = {
      ...data,
      id,
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt,
      publicationDate,
    };
    db.videos.push(createVideoInputModel);
    res
      .status(HTTP_CODES.HTTP_STATUS_CREATED)
      .json(mapVideoDtoToView(createVideoInputModel));
  });
  router.put("/:id", (req: RequestWithParams<{ id: number }>, res) => {
    const data = req.body;

    const idToUpdate = Number(req.params.id);
    const foundEntity = db.videos.find((v) => v.id === idToUpdate);
    if (foundEntity === undefined) {
      return res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
    }

    const errors = validateUpdateVideoInputModel(data);
    if (errors.length) {
      const errorResponse: IErrorMessageResponse = {
        errorsMessages: errors,
      };
      return res.status(HTTP_CODES.HTTP_STATUS_BAD_REQUEST).json(errorResponse);
    }

    const updatedEntity = { ...foundEntity, ...data };
    db.videos = db.videos.map((v) => (v.id !== idToUpdate ? v : updatedEntity));

    res.sendStatus(HTTP_CODES.HTTP_STATUS_NO_CONTENT);
  });
  router.delete("/:id", (req: RequestWithParams<{ id: number }>, res) => {
    const idToRemove = Number(req.params.id);
    const videoIndex = db.videos.findIndex((v) => v.id === idToRemove);
    if (videoIndex === -1) {
      res.sendStatus(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
    }
    db.videos.splice(idToRemove, 1);
    res.sendStatus(HTTP_CODES.HTTP_STATUS_NO_CONTENT);
  });

  return router;
};
