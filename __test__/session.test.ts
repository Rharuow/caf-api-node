import request from 'supertest'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../src/repositories/UserRepository'

import "./connection"

describe("Tests to create a session with jwt", () => {
  test("Should return jwt with correctly credentials", async () => {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.find()

    console.log("USERS = ", user)
  })
})

