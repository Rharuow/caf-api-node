import { getCustomRepository } from "typeorm";

import connection from "../src/database";
import request from "supertest";
import app from "../src/app";
import { UserRepository } from "../src/repositories/UserRepository";
import data from './util'

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await request(app).delete("/v2/user").send({ email: data.employee.email });
  await request(app).delete("/v2/user").send({ email: data.visitant.email });
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.delete({ email: "test@mail.com" });

  await connection.close();
});

beforeEach(async () => {
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.delete({
    email: "test@mail.com",
  });
});
