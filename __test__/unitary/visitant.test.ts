import { createVisitant } from "../factory"

import "../connection"

describe("Tests to get visitant's resources", () => {
  test("Should return visitant's test cpf", async () => {
    const visitante = await createVisitant()

    expect(visitante).toHaveProperty("cpf", "000.000.000-00")
  })

})