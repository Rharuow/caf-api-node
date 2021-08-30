import request from "supertest";
import fs from "mz/fs";
import app from "../src/app";

const avatar = "./image/avatar2.png";
import "./connection";

test("should create a visitant and return status 200", async () => {
  fs.exists(avatar).then((exists) => {
    request(app)
      .post("/v2/visitant")
      .attach("file", avatar)
      .send({
        username: "test",
        email: "kekin22632@drlatvia.com",
        cpf: "000.000.000-00",
        photo: avatar,
      })
      .then((res) => {
        const { success, message, filePath } = res.body;
        expect(success).toBeTruthy();
        expect(message).toBe("Uploaded successfully");
        expect(typeof filePath).toBeTruthy();
      })
      .catch((err) => console.log(err));
  });
});
