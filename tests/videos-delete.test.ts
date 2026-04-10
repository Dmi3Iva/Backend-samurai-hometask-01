import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";
import type { CreateVideoInputModel } from "../src/features/videos/models";
import { HTTP_CODES, ROUTERS } from "../src/constants";
import { GetCreateVideoInputModel } from "./utils/videos.mock.creator";

const getRequest = () => request(app);

const basePath = ROUTERS.VIDEOS;
const testingBasePath = ROUTERS.TESTING;

const { createEntity, getEntities, getEntity, deleteEntity } =
  videosTestManager;

describe("test delete methods /videos router", () => {
  beforeEach(() => {
    return getRequest().delete(`${testingBasePath}/all-data`).send({});
  });

  // - Удаление несуществующего → 404
  it("should get 404 on remove not existed element", async () => {
    const { result } = await deleteEntity({
      id: 999999,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });

    expect(result.status).toBe(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
  });

  // - Некорректный формат id
  it("should check if id it not valid", async () => {
    const result = await getRequest()
      .delete(`${basePath}/invalid`)
      .expect(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
  });

  // - нормальное удаление
  it("should remove element", async () => {
    const data: CreateVideoInputModel = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data });

    await deleteEntity({
      id: createdEntity.id,
    });

    await getEntity({
      data: createdEntity.id,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });
  });

  // - Повторное удаление → 404
  it("should get 404 on double remove the same element", async () => {
    const data: CreateVideoInputModel = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data });

    await deleteEntity({
      id: createdEntity.id,
    });

    await deleteEntity({
      id: createdEntity.id,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });
  });
});
