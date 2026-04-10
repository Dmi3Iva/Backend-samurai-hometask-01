import request from "supertest";
import { app } from "../../src/app";
import {
  CreateVideoInputModel,
  UpdateViewInputModel,
  VideoViewModel,
} from "../../src/features/videos/models";
import { expect } from "vitest";
import type { Response } from "supertest";
import { HTTP_CODES, ROUTERS } from "../../src/constants";
import type { StatusCodeType } from "../../src/types";

const getRequest = () => request(app);
const basePath = ROUTERS.VIDEOS;

export const videosTestManager = {
  async createEntity({
    data,
    expectedStatus = HTTP_CODES.HTTP_STATUS_CREATED,
  }: {
    data: CreateVideoInputModel;
    expectedStatus?: StatusCodeType;
  }): Promise<{
    result: Response;
    createdEntity: VideoViewModel;
  }> {
    const result = await getRequest().post(basePath).send(data);
    const createdEntity = result.body;

    if (expectedStatus === HTTP_CODES.HTTP_STATUS_CREATED) {
      expect(createdEntity).toEqual({
        id: expect.any(Number),
        title: data.title,
        author: data.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: expect.any(String),
        publicationDate: expect.any(String),
        availableResolutions: data.availableResolutions,
      });
    }

    expect(result.status).toBe(expectedStatus);

    return { result, createdEntity };
  },

  async getEntities({
    expectedStatus = HTTP_CODES.HTTP_STATUS_OK,
  }: {
    expectedStatus?: StatusCodeType;
  }): Promise<{
    result: Response;
    resultEntities: VideoViewModel[];
  }> {
    const result = await getRequest().get(basePath);

    expect(result.status).toBe(expectedStatus);
    const resultEntities = result.body;

    return { result, resultEntities };
  },

  async getEntity({
    data,
    expectedStatus = HTTP_CODES.HTTP_STATUS_OK,
  }: {
    data: number;
    expectedStatus?: StatusCodeType;
  }) {
    const result = await getRequest().get(`${basePath}/${data}`);
    expect(result.status).toBe(expectedStatus);
    return { result };
  },

  async updateEntity({
    id,
    data,
    expectedStatus = HTTP_CODES.HTTP_STATUS_NO_CONTENT,
  }: {
    id: number;
    data: UpdateViewInputModel;
    expectedStatus: StatusCodeType;
  }): Promise<{
    result: Response;
  }> {
    const result = await getRequest().put(`${basePath}/${id}`).send(data);
    expect(result.status).toBe(expectedStatus);
    return { result };
  },

  async deleteEntity({
    id,
    expectedStatus = HTTP_CODES.HTTP_STATUS_NO_CONTENT,
  }: {
    id: number;
    expectedStatus?: StatusCodeType;
  }): Promise<{
    result: Response;
  }> {
    const result = await getRequest().delete(`${basePath}/${id}`);
    expect(result.status).toBe(expectedStatus);
    return { result };
  },
};
