import connection from "../src/database";
import request from "supertest";
import app from "../src/app";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  const response = await request(app).delete("/v2/user").send({ email: "naxacif239@mnqlm.com" });
  console.log("AFTER ALL = ", response.body)

  await connection.close();
});

// beforeEach(async () => {
//   await connection.clear();
// });
