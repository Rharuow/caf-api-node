import request from "supertest";
import { getCustomRepository } from "typeorm";

import app from "../../src/app";

import data from '../util'

import "../connection";
import { TempUserRepository } from "../../src/repositories/TempUserRepository";

describe("Test about users context", () => {
  test("should return status 400 when visitant´s credentials aren't sent correctly", async () => {
    const response = await request(app)
      .post("/v2/auth")
      .send({ email: "mail@mail.com", password: "123123123" });
    expect(response.status).toBe(400);
  });

  test("should return user email when create visitant done", async () => {
    const response = await request(app)
      .post("/v2/visitant")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", data.visitant.username)
      .field("email", data.visitant.email)
      .field("cpf", data.visitant.cpf)
      .attach("photo", data.avatar);
    
    expect(response.body).toHaveProperty("user.email", data.visitant.email);
  });

  
  test("should return text 'user created with success' when confirmation password has done with success", async () => {
    const tempUserRepository = getCustomRepository(TempUserRepository);

    const user = await tempUserRepository.findOneOrFail({
      where: { email: data.visitant.email },
    });

    const response = await request(app).post("/v2/confirmation").send({
      token: user.confirmation_token,
      role: user.role,
      password: "123123123",
    });

    expect(response.body.text).toBe("user created with success");
  });

  test("should return error when try create user with username already registred", async () => {
    const response = await request(app)
      .post("/v2/visitant")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", data.visitant.username)
      .field("email", "test@mail.com")
      .field("cpf", "000.000.000-45")
      .attach("photo", data.avatar);
    
    expect(response.body).toHaveProperty("message", "User already exists");
  });

  test("should return error when try create user with email already registred", async () => {
    const response = await request(app)
      .post("/v2/visitant")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", "Test Visitant 2")
      .field("email", data.visitant.email)
      .field("cpf", "111.111.111-11")
      .attach("photo", data.avatar);
    
    expect(response.body).toHaveProperty("message", "User already exists");
  });

  test("should return error when try create user with cpf already registred", async () => {
    const response = await request(app)
      .post("/v2/visitant")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", "Test Visitant 2")
      .field("email", "test@mail.com")
      .field("cpf", data.visitant.cpf)
      .attach("photo", data.avatar);
    
    expect(response.body).toHaveProperty("message", "User already exists");
  });

  test("should return user email when create employee done", async () => {
    const response = await request(app)
      .post("/v2/employee")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", data.employee.username)
      .field("email", data.employee.email)
      .field("registration", data.employee.registration)
      .attach("photo", data.avatar);

    expect(response.body).toHaveProperty("user.email", data.employee.email);
  });

  test("should return text 'user created with success' when confirmation password has done with success", async () => {
    const tempUserRepository = getCustomRepository(TempUserRepository);

    const user = await tempUserRepository.findOneOrFail({
      where: { email: data.employee.email },
    });

    const response = await request(app).post("/v2/confirmation").send({
      token: user.confirmation_token,
      role: user.role,
      password: "123123123",
    });

    expect(response.body.text).toBe("user created with success");
  });

  test("should return error when try create user with registration already registred", async () => {
    const response = await request(app)
      .post("/v2/employee")
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("connection", "keep-alive")
      .field("username", "Test Visitant 2")
      .field("email", "test@mail.com")
      .field("registration", data.employee.registration)
      .attach("photo", data.avatar);
    
    expect(response.body).toHaveProperty("message", "User already exists");
  });
});
