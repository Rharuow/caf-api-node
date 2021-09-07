import { createUser } from "../factory"

import "../connection"

describe("Tests to get users resources", () => {
  test("Should return user's username", async () => {
    const user = await createUser()

    expect(user).toHaveProperty("username", "test")
  })
  
  test("Should return user's email", async () => {
    const user = await createUser()

    expect(user).toHaveProperty("email", "test@mail.com")
  })

  test("Should return user's confirmation_token", async () => {
    const user = await createUser()

    expect(user).toHaveProperty("confirmation_token", "123123123")
  })

  test("Should return user's avatar", async () => {
    const user = await createUser()

    expect(user).toHaveProperty("avatar")
  })
})