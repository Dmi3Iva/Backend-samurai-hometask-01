import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";
import { HTTP_CODES } from "../src/constants";
import {
  GetCreateVideoInputModel,
  GetUpdateVideoInputModel,
} from "./utils/videos.mock.creator";

const getRequest = () => request(app);

const basePath = "/hometask_01/api/videos";
const testingBasePath = "/hometask_01/api/testing";

const { createEntity, getEntities, getEntity, updateEntity } =
  videosTestManager;

// TODO:: finish tests
describe("test put methods /videos router", () => {
  beforeEach(() => {
    return getRequest().post(`${testingBasePath}/all-data`).send({});
  });

  // - Обновление несуществующего → 404
  it("Should not update not existed entity", async () => {
    const data = GetUpdateVideoInputModel({});
    await updateEntity({
      data,
      id: 1,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });
  });
  // - Некорректный формат id
  it("Should validate parameter", async () => {
    const data = GetUpdateVideoInputModel({});
    await updateEntity({
      data,
      id: "strin",
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });
  });
  // - Валидация полей при обновлении (аналогично POST)
  it("Expect error validation author field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete data.author;

    const result = await updateEntity({
      id: createdEntity.id,
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body).toBe({
      errorsMessages: [
        {
          field: "author",
          message: expect.any(String),
        },
      ],
    });
  });
  it("Expect error validation title field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete data.title;

    const result = await updateEntity({
      id: createdEntity.id,
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body).toBe({
      errorsMessages: [
        {
          field: "title",
          message: expect.any(String),
        },
      ],
    });
  });
  // TODO:: check if availableResolutions length === 0 it's error
  it("Expect error validation availableResolutions field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete data.availableResolutions;

    const result = await updateEntity({
      id: createdEntity.id,
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body).toBe({
      errorsMessages: [
        {
          field: "availableResolutions",
          message: expect.any(String),
        },
      ],
    });
  });
  it("Expect error validation canBeDownloaded field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete data.canBeDownloaded;

    const result = await updateEntity({
      id: createdEntity.id,
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body).toBe({
      errorsMessages: [
        {
          field: "canBeDownloaded",
          message: expect.any(String),
        },
      ],
    });
  });
  // TODO:: check that in update it possble to set value as 1 to 18 not null
  it("Expect error validation minAgeRestriction field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete data.minAgeRestriction;

    const result = await updateEntity({
      id: createdEntity.id,
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body).toBe({
      errorsMessages: [
        {
          field: "minAgeRestriction",
          message: expect.any(String),
        },
      ],
    });
  });
  // TODO:: check that publicationDate special format
  it("Expect error validation publicationDate field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete data.publicationDate;

    const result = await updateEntity({
      id: createdEntity.id,
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body).toBe({
      errorsMessages: [
        {
          field: "publicationDate",
          message: expect.any(String),
        },
      ],
    });
  });
  // - Обновление отдельных полей
  it("Should update existed entity", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});

    const result = await updateEntity({
      id: createdEntity.id,
      data,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body).toBe(data);
  });
});
