import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";
import { AVAILABLE_RESOLUTIONS_ENUM } from "../src/constants/available-resolutions.const";
import type { CreateVideoInputModel } from "../src/features/videos/models";
import { HTTP_CODES } from "../src/constants";
import { GetCreateVideoInputModel } from "./utils/videos.mock.creator";
import { create } from "node:domain";

const getRequest = () => request(app);

const basePath = "/hometask_01/api/videos";
const testingBasePath = "/hometask_01/api/testing";

const { createEntity, getEntities, getEntity } = videosTestManager;

describe("test get methods /videos router", () => {
  beforeEach(() => {
    return getRequest().post(`${testingBasePath}/all-data`).send({});
  });

  // GET /videos
  it("should return empty list with success", async () => {
    const { result } = await getEntities({
      expectedStatus: HTTP_CODES.HTTP_STATUS_OK,
    });

    expect(result.body).toHaveLength(0);
  });
  it("should return one item in list with success", async () => {
    const data = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data });

    const actual = await getEntities({});

    expect(actual.result).toEqual([createdEntity]);
  });
  it("should return two items in list with success", async () => {
    const data = GetCreateVideoInputModel({});
    const { createdEntity: ce1 } = await createEntity({ data });
    const { createdEntity: ce2 } = await createEntity({ data });

    const actual = await getEntities({});

    expect(actual.result).toEqual([ce1, ce2]);
  });
  it("should return 56 items in list with success", async () => {
    const data = GetCreateVideoInputModel({});

    const createdEntities = await Promise.all(
      Array.from({ length: 56 }).map(async () => {
        return await createEntity({ data });
      }),
    );

    const actual = await getEntities({});

    expect(actual.result).toEqual(createdEntities);
  });
  // GET /videos/:id:
  it("should create and get that video", async () => {
    const data = GetCreateVideoInputModel({});
    const { createdEntity } = await createEntity({ data });

    const actual = await getEntity({ data: createdEntity.id });

    expect(actual.result.body).toEqual(createEntity);
  });
  it("should return NOT_FOUND in case if video doesn't exist", async () => {
    const actual = await getEntity({ data: 1 });

    expect(actual.result.body).toEqual(createEntity);
  });
  it("should return BAD_REQUEST in case if param is not a number", async () => {
    const actual = await getEntity({ data: "somr" as unknown as number });

    expect(actual.result.body).toEqual(createEntity);
  });
});
