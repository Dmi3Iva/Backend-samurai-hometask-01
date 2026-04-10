import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";
import { HTTP_CODES, ROUTERS } from "../src/constants";
import {
  GetCreateVideoInputModel,
  GetUpdateVideoInputModel,
} from "./utils/videos.mock.creator";
import { isoRegex } from "./constants";

const getRequest = () => request(app);

const basePath = ROUTERS.VIDEOS;
const testingBasePath = ROUTERS.TESTING;

const { createEntity, getEntities, getEntity, updateEntity } =
  videosTestManager;

describe("test put methods /videos router", () => {
  beforeEach(() => {
    return getRequest().delete(`${testingBasePath}/all-data`).send({});
  });

  // - Обновление несуществующего → 404
  it("Should not update not existed entity", async () => {
    const data = GetUpdateVideoInputModel({});
    await updateEntity({
      data: data as any,
      id: 1,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NOT_FOUND,
    });
  });

  // - Некорректный формат id
  it("Should validate parameter", async () => {
    const data = GetUpdateVideoInputModel({});
    await getRequest()
      .put(`${basePath}/strin`)
      .send(data)
      .expect(HTTP_CODES.HTTP_STATUS_NOT_FOUND);
  });

  // - Валидация полей при обновлении (аналогично POST)
  it("Expect error validation author field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete (data as any).author;

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toStrictEqual([
      {
        field: "author",
        message: expect.any(String),
      },
    ]);
  });

  it("Expect error validation title field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete (data as any).title;

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toStrictEqual([
      {
        field: "title",
        message: expect.any(String),
      },
    ]);
  });

  it("Expect error validation availableResolutions field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete (data as any).availableResolutions;

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toStrictEqual([
      {
        field: "availableResolutions",
        message: expect.any(String),
      },
    ]);
  });

  it("Expect error validation canBeDownloaded field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete (data as any).canBeDownloaded;

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toStrictEqual([
      {
        field: "canBeDownloaded",
        message: expect.any(String),
      },
    ]);
  });

  it("Expect error validation minAgeRestriction field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete (data as any).minAgeRestriction;

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toStrictEqual([
      {
        field: "minAgeRestriction",
        message: expect.any(String),
      },
    ]);
  });

  it("Expect error validation publicationDate field", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    delete (data as any).publicationDate;

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toStrictEqual([
      {
        field: "publicationDate",
        message: expect.any(String),
      },
    ]);
  });

  // - Обновление отдельных полей
  it("Should update existed entity", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_NO_CONTENT,
    });

    expect(result.status).toBe(HTTP_CODES.HTTP_STATUS_NO_CONTENT);

    const { result: getEntityResult } = await getEntity({
      data: createdEntity.id,
    });
    expect(getEntityResult.body).toStrictEqual({
      id: createdEntity.id,
      title: data.title,
      author: data.author,
      canBeDownloaded: data.canBeDownloaded,
      minAgeRestriction: data.minAgeRestriction,
      availableResolutions: data.availableResolutions,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
    });

    expect(getEntityResult.body.createdAt).toMatch(isoRegex);
    expect(getEntityResult.body.publicationDate).toMatch(isoRegex);
  });

  // - Валидация типов полей при обновлении
  it("Should validate field types: title as null, canBeDownloaded as string", async () => {
    const createData = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data: createData });

    const data = GetUpdateVideoInputModel({});
    (data as any).title = null;
    (data as any).canBeDownloaded = "string";

    const { result } = await updateEntity({
      id: createdEntity.id,
      data: data as any,
      expectedStatus: HTTP_CODES.HTTP_STATUS_BAD_REQUEST,
    });

    expect(result.body.errorsMessages).toStrictEqual([
      {
        field: "title",
        message: expect.any(String),
      },
      {
        field: "canBeDownloaded",
        message: expect.any(String),
      },
    ]);
  });
});
