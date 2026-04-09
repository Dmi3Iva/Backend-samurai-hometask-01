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

// TODO:: finish tests
describe("test delete methods /videos router", () => {
  beforeEach(() => {
    return getRequest().post(`${testingBasePath}/all-data`).send({});
  });

  // - Удаление несуществующего → 404
  it("should get 404 on remove not existed element", async () => {});
  // - Некорректный формат id
  it("should check if id it not valid", async () => {});
  // - нормальное удаление
  it("should remove element", async () => {});
  // - Повторное удаление → 404
  it("should get 404 on double remove the same element", async () => {});
});
