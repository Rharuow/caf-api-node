import request from "supertest";
import { getCustomRepository } from "typeorm";

import app from "../src/app";
import { UserRepository } from "../src/repositories/UserRepository";

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
      .field("username", "Test visitant")
      .field("email", "naxacif239@mnqlm.com")
      .field("cpf", "000.000.000-00")
      .attach("photo", "__test__/images/avatar.png");

    expect(response.status).toBe(200);
  });

  test("should return text 'user created with success' when confirmation password has done with success", async () => {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOneOrFail({where: {email: 'naxacif239@mnqlm.com'}})

    const response = await request(app)
      .post('/v2/confirmation')
      .send({
        token: user.confirmation_token,
        role: user.role,
        password: '123123123'
      })

    expect(response.body.text).toBe("user created with success")
  })

  test("should return status 200 when create employee done", async () => {
    const response = await request(app)
      .post("/v2/employee")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", "Test Employee")
      .field("email", "joben44053@mom2kid.com")
      .field("registration", "123123123123")
      .attach("photo", "__test__/images/avatar.png");

    expect(response.status).toBe(200);
  });

  test("should return text 'user created with success' when confirmation password has done with success", async () => {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOneOrFail({where: {email: 'joben44053@mom2kid.com'}})

    const response = await request(app)
      .post('/v2/confirmation')
      .send({
        token: user.confirmation_token,
        role: user.role,
        password: '123123123'
      })
    
    expect(response.body.text).toBe("user created with success")
  })
});
