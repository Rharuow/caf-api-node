import connection from "../src/database";
import request from "supertest";
import app from "../src/app";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../src/repositories/UserRepository";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await request(app).delete("/v2/user").send({ email: "pebeli9111@silbarts.com" });
  await request(app)
    .delete("/v2/user")
    .send({ email: "joben44053@mom2kid.com" });
  const userRepository = getCustomRepository(UserRepository);
  const userDelete = await userRepository.delete({ email: "test@mail.com" });

  await connection.close();
});

beforeEach(async () => {
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.delete({
    email: "test@mail.com",
  });
});
