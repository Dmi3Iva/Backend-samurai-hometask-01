import { describe, it, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { videosTestManager } from "./utils/videos-test-manager";

const getRequest = () => request(app);

const basePath = "/hometask_01/api/videos";
const testingBasePath = "/hometask_01/api/testing";

const { createEntity } = videosTestManager;

describe("test /videos router", () => {
  beforeEach(() => {
    return getRequest().post(`${testingBasePath}/all-data`).send({});
  });

  it("should create video with correct input", async () => {
    await createEntity();
  });
});
