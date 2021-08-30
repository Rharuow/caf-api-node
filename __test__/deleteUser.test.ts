import request from "supertest";

import app from "../src/app";
import "../src/database";

test("should delete user and return 200 status", async () => {
  const response = await request(app)
    .delete("/v2/user")
    .set("Content-Type", "application/json")
    .send({
      email: "nijojod974@macauvpn.com",
    });

  console.log(response.body);
});
