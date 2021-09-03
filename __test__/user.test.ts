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
      .field("email", "test@mail.com")
      .field("username", "testing")
      .field("cpf", "000.000.000-00")
      .attach("avatar", "./avatar.png");
    console.log(response.body);
  });
});
