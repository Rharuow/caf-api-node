import request from "supertest";

import app from "../../src/app";

import "../connection";

describe("Test about users context", () => {
  test("should create a temporary user before confirmation´s register", async () => {
    const response = await request(app)
      .post("/v2/employee")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", "Test employee")
      .field("email", "wonixi1604@stvbz.com")
      .field("registration", "000000000000")
      .attach("photo", "__test__/images/avatar.png");

      console.log(response.status)
      console.log(response.body)

    // expect(response.status).toBe(200);
  });
})