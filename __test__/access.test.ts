import request from "supertest";
import app from "../src/app";
import { CreateUserWithAccess } from "./factory";

import './connection'


describe("Tests to verify checkin and checkout", () => {
  test("should return error to try checkout without checkin", async () => {
    const user = await CreateUserWithAccess()

    const response = await request(app)
      .post("/v2/checkout")
      .send({email: 'test@mail.com'})

  })
})