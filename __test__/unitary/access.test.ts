

import { getCustomRepository } from "typeorm"
import { AccessRepository } from "../../src/repositories/AccessRepository"
import "../connection"
import { createAccess } from "../factory"

describe("Tests to get access's resources", () => {
  test("Should return access's alphanumeric", async () => {
    const access = await createAccess()

    expect(access).toHaveProperty("alphanumeric", "000000000000")
  })

  test("Should return access's checkin", async () => {
    await createAccess()

    const accessRepository = getCustomRepository(AccessRepository)

    const access = await accessRepository.findOne({where: {alphanumeric: '000000000000'}})

    expect(access).toHaveProperty("checkin", null)
  })

  test("Should return access's checkout", async () => {
    await createAccess()

    const accessRepository = getCustomRepository(AccessRepository)

    const access = await accessRepository.findOne({where: {alphanumeric: '000000000000'}})

    expect(access).toHaveProperty("checkout", null)
  })

  test("Should return access's status", async () => {
    await createAccess()

    const accessRepository = getCustomRepository(AccessRepository)

    const access = await accessRepository.findOne({where: {alphanumeric: '000000000000'}})

    expect(access).toHaveProperty("is_active", true)
  })
})