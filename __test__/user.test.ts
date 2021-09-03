import request from "supertest";

import app from "../src/app";

import "./connection";

describe("Test about users context", () => {
  test("should return status 400 when visitant´s credentials aren't sent correctly", async () => {
    const response = await request(app)
      .post("/v2/auth")
      .send({ email: "mail@mail.com", password: "123123123" });
    expect(response.status).toBe(400);
  });

  test("should return status 200 when create visitant done", async () => {
    const response = await request(app)
      .post("/v2/visitant")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", "testing")
      .field("email", "gewes44054@mom2kid.com")
      .field("cpf", "000.000.000-00")
      .attach("photo", "__test__/images/avatar.png");

    expect(response.status).toBe(200);
  });
});
