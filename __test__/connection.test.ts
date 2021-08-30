import request from "supertest";

import app from "../src/app";

test("should return status 200", async () => {
  const response = await request(app).get("/v2");

  expect(response.status).toBe(200);
});
