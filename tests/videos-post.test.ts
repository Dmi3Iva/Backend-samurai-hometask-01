import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";
import { AVAILABLE_RESOLUTIONS_ENUM } from "../src/constants/available-resolutions.const";
import type { CreateVideoInputModel } from "../src/features/videos/models";
import { HTTP_CODES, ROUTERS } from "../src/constants";

const getRequest = () => request(app);

const basePath = ROUTERS.VIDEOS;
const testingBasePath = ROUTERS.TESTING;

const { createEntity, getEntities, getEntity } = videosTestManager;

describe("test post methods /videos router", () => {
  beforeEach(() => {
    return getRequest().delete(`${testingBasePath}/all-data`).send({});
  });

  it("should create video with correct input", async () => {
    const data: CreateVideoInputModel = {
      title: "first test video",
      author: "me",
      availableResolutions: [
        AVAILABLE_RESOLUTIONS_ENUM.P144,
        AVAILABLE_RESOLUTIONS_ENUM.P240,
        AVAILABLE_RESOLUTIONS_ENUM.P360,
      ],
    };
    await createEntity({ data });
  });

  it("should not create video with incorrect input", async () => {
    const title41Length = "a".repeat(41);
    const author21Length = "a".repeat(21);
    const data: CreateVideoInputModel = {
      title: title41Length,
      author: author21Length,
      availableResolutions: [],
    };
    const { result } = await createEntity({
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toHaveLength(3);
  });

  it("should not create video with empty availableResolutions", async () => {
    const title = "video without resolutions";
    const author = "ai agent";
    const data: CreateVideoInputModel = {
      title,
      author,
      availableResolutions: [],
    };
    const { result } = await createEntity({
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toEqual([
      {
        field: "availableResolutions",
        message: expect.any(String),
      },
    ]);
    expect(result.body.errorsMessages).toHaveLength(1);
  });

  it("should not create video with incorrect availableResolutions", async () => {
    const data = {
      title: "video with bad resolutions",
      author: "ai agent",
      availableResolutions: ["hren"],
    };
    const result = await getRequest()
      .post(basePath)
      .send(data)
      .expect(HTTP_CODES.HTTP_STATUS_BAD_REQUEST);

    expect(result.body.errorsMessages).toEqual([
      {
        field: "availableResolutions",
        message: expect.any(String),
      },
    ]);
    expect(result.body.errorsMessages).toHaveLength(1);
  });

  it("should not create video WITHOUT TITLE", async () => {
    const author = "valid author";
    const data: Partial<CreateVideoInputModel> = {
      author,
      availableResolutions: [AVAILABLE_RESOLUTIONS_ENUM.P1080],
    };
    const { result } = await createEntity({
      data: data as CreateVideoInputModel,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toEqual([
      {
        field: "title",
        message: expect.any(String),
      },
    ]);
  });

  it("should not create video WITHOUT AUTHOR", async () => {
    const title = "valid title";
    const data: Partial<CreateVideoInputModel> = {
      title,
      availableResolutions: [AVAILABLE_RESOLUTIONS_ENUM.P144],
    };
    const { result } = await createEntity({
      data: data as CreateVideoInputModel,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toEqual([
      {
        field: "author",
        message: expect.any(String),
      },
    ]);
  });

  it("should not create video WITHOUT AVAILABLE_RESOLUTIONS", async () => {
    const author = "valid author";
    const title = "valid title";
    const data: Partial<CreateVideoInputModel> = {
      author,
      title,
    };
    const { result } = await createEntity({
      data: data as CreateVideoInputModel,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toEqual([
      {
        field: "availableResolutions",
        message: expect.any(String),
      },
    ]);
  });

  it("should create video with edge values", async () => {
    const author = "r".repeat(20);
    const title = "t".repeat(40);
    const data: CreateVideoInputModel = {
      author,
      title,
      availableResolutions: [AVAILABLE_RESOLUTIONS_ENUM.P144],
    };
    const { createdEntity } = await createEntity({
      data,
    });

    const { result: receivedEntity } = await getEntity({
      data: createdEntity.id,
    });

    expect(receivedEntity.body).toEqual(createdEntity);
  });
});
