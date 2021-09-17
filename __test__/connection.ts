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
  const delete1 = await request(app).delete("/v2/user").send({ email: data.employee.email });
  const delete2 = await request(app).delete("/v2/user").send({ email: data.visitant.email });
  const userRepository = getCustomRepository(UserRepository);
  const delete3 = await userRepository.delete({ email: "test@mail.com" });

  console.log("Delete 1 = ", delete1.body)
  console.log("Delete 2 = ", delete2.body)
  console.log("Delete 3 = ", delete3)

  await connection.close();
});

beforeEach(async () => {
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.delete({
    email: "test@mail.com",
  });
});
