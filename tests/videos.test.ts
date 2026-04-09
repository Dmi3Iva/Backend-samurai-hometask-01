import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";
import { AVAILABLE_RESOLUTIONS_ENUM } from "../src/constants/available-resolutions.const";
import type { CreateVideoInputModel } from "../src/features/videos/models";
import { HTTP_CODES } from "../src/constants";

const getRequest = () => request(app);

const basePath = "/hometask_01/api/videos";
const testingBasePath = "/hometask_01/api/testing";

const { createEntity, getEntities, getEntity } = videosTestManager;

describe("Integration test route /video", () => {
  beforeEach(() => {
    return getRequest().post(`${testingBasePath}/all-data`).send({});
  });

  it("should not create ");

  it("should not create video with incorrect input and return one error", async () => {});
  it("should not create video with empty input and return one error", async () => {});

  

  it("should create 2 videos and return them get /videos");
  it("should create 2 videos and return them separetely get /videos/:id");
  it("should add one video and remove it delete /videos/:id");
  it("should add one video and update it put /videos/:id");
  it("should add one video and DO NOT update it put /videos/:id with errors");

  // Интеграционные:
  // - Несколько операций подряд (создать → обновить → published → удалить)
});
