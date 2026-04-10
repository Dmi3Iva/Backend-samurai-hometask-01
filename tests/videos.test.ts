import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";
import { AVAILABLE_RESOLUTIONS_ENUM } from "../src/constants/available-resolutions.const";
import type { CreateVideoInputModel } from "../src/features/videos/models";
import { HTTP_CODES } from "../src/constants";
import {
  GetCreateVideoInputModel,
  GetUpdateVideoInputModel,
} from "./utils/videos.mock.creator";

const getRequest = () => request(app);

const basePath = "/hometask_01/api/videos";
const testingBasePath = "/hometask_01/api/testing";

const { createEntity, getEntities, getEntity, updateEntity, deleteEntity } =
  videosTestManager;

describe("Integration test route /video", () => {
  beforeEach(() => {
    return getRequest().delete(`${testingBasePath}/all-data`).send({});
  });

  it("should not create video with incorrect title length", async () => {
    const data: CreateVideoInputModel = {
      title: "a".repeat(41),
      author: "me",
      availableResolutions: [AVAILABLE_RESOLUTIONS_ENUM.P144],
    };

    const { result } = await createEntity({
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toContainEqual({
      field: "title",
      message: expect.any(String),
    });
  });

  it("should not create video with incorrect input and return one error", async () => {
    const data: CreateVideoInputModel = {
      title: "dasdjewfgijregb jrebgreigbreiubgrebuig32423",
      author: "me",
      availableResolutions: [AVAILABLE_RESOLUTIONS_ENUM.P144],
    };

    const { result } = await createEntity({
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toHaveLength(1);
    expect(result.body.errorsMessages[0].field).toBe("title");
  });

  it("should not create video with empty input and return one error", async () => {
    const data: any = {};

    const { result } = await createEntity({
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages.length).toBeGreaterThan(0);
  });

  it("should create 2 videos and return them get /videos", async () => {
    const data1 = GetCreateVideoInputModel({ title: "Video 1" });
    const data2 = GetCreateVideoInputModel({ title: "Video 2" });

    await createEntity({ data: data1 });
    await createEntity({ data: data2 });

    const { result } = await getEntities({});
    expect(result.body).toHaveLength(2);
  });

  it("should create 2 videos and return them separetely get /videos/:id", async () => {
    const data1 = GetCreateVideoInputModel({ title: "Video 1" });
    const data2 = GetCreateVideoInputModel({ title: "Video 2" });

    const { createdEntity: entity1 } = await createEntity({ data: data1 });
    const { createdEntity: entity2 } = await createEntity({ data: data2 });

    const { result: result1 } = await getEntity({ data: entity1.id });
    const { result: result2 } = await getEntity({ data: entity2.id });

    expect(result1.body).toEqual(entity1);
    expect(result2.body).toEqual(entity2);
  });

  it("should add one video and remove it delete /videos/:id", async () => {
    const data = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data });

    await deleteEntity({ id: createdEntity.id });

    const { result } = await getEntity({
      data: createdEntity.id,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });

    expect(result.status).toBe(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
  });

  it("should add one video and update it put /videos/:id", async () => {
    const data = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data });

    const updateData = GetUpdateVideoInputModel({
      title: "Updated title",
      author: "Updated author",
    });

    await updateEntity({
      id: createdEntity.id,
      data: updateData as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NO_CONTENT,
    });

    const { result } = await getEntity({ data: createdEntity.id });
    expect(result.body.title).toBe("Updated title");
    expect(result.body.author).toBe("Updated author");
  });

  it("should add one video and DO NOT update it put /videos/:id with errors", async () => {
    const data = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data });

    const updateData = {
      title: "a".repeat(41), // Invalid title
      author: "valid author",
      availableResolutions: [AVAILABLE_RESOLUTIONS_ENUM.P144],
      canBeDownloaded: true,
      minAgeRestriction: 18,
      publicationDate: new Date().toISOString(),
    };

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: updateData as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toContainEqual({
      field: "title",
      message: expect.any(String),
    });
  });

  // Интеграционные:
  // - Несколько операций подряд (создать → обновить → published → удалить)
  it("should perform full lifecycle: create → update → delete", async () => {
    // Create
    const createData = GetCreateVideoInputModel({
      title: "Lifecycle Video",
    });
    const { createdEntity } = await createEntity({ data: createData });

    expect(createdEntity.title).toBe("Lifecycle Video");
    expect(createdEntity.canBeDownloaded).toBe(true);

    // Update
    const updateData = GetUpdateVideoInputModel({
      title: "Updated Lifecycle Video",
      canBeDownloaded: false,
      minAgeRestriction: 16,
    });
    await updateEntity({
      id: createdEntity.id,
      data: updateData as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NO_CONTENT,
    });

    const { result: updatedEntity } = await getEntity({
      data: createdEntity.id,
    });
    expect(updatedEntity.body.title).toBe("Updated Lifecycle Video");
    expect(updatedEntity.body.canBeDownloaded).toBe(false);
    expect(updatedEntity.body.minAgeRestriction).toBe(16);

    // Delete
    await deleteEntity({ id: createdEntity.id });

    const { result: deletedCheck } = await getEntity({
      data: createdEntity.id,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });
    expect(deletedCheck.status).toBe(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
  });
});
