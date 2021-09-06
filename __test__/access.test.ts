import request from "supertest";
import app from "../src/app";

import './connection'
import { GetAccessActiveByUser } from "./factory";


describe("Tests to verify checkin and checkout", () => {
  test("should return error to try checkout without checkin", async () => {
    const accessByUser = await GetAccessActiveByUser()

    const response = await request(app)
      .post("/v2/checkout")
      .send({email: 'test@mail.com', code: accessByUser.alphanumeric})

    console.log(response.body)

    expect(response.body.text).toBe("hasn't checking")

  })
})