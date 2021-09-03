import faker from "faker"
import request from "supertest";
import { getCustomRepository } from "typeorm"
import app from "../src/app";
import { UserRepository } from "../src/repositories/UserRepository"
import { VisitantRepository } from "../src/repositories/VisitantRepository"

describe('Test about users context', () => {
  test("should return status 400 when visitant´s credentials aren't sent correctly", async () => {
    const response = await request(app).post('/v2/auth').send({email: "mail@mail.com", password: '123123123'})

    expect(response.status).toBe(400)

  })  

  test("should return status 400 when visitant´s credentials are sent correctly", async () => {
    const response = await request(app).post('/v2/auth').send({email: "mail@mail.com", password: '123123123'})

    expect(response.status).toBe(200)

  })  

})
