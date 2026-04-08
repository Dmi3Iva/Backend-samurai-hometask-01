import express from "express";
import { getTestingRouter } from "./features/testing/testing.router";
import { ROUTERS } from "./constants";
import { getVideoRouter } from "./features/videos/videos.router";
import { db } from "./db/db";

export const app = express();

app.use(express.json());

app.use(ROUTERS.VIDEOS, getVideoRouter(db));
app.use(ROUTERS.TESTINGS, getTestingRouter());
