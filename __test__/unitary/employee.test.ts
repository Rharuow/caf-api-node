import { createEmployee } from "../factory";

import "../connection";

describe("Tests to get employee's resources", () => {
  test("Should return employee's registration", async () => {
    const employee = await createEmployee();

    expect(employee).toHaveProperty("registration", "000000000000");
  });
});
