import request from 'supertest'
import { getCustomRepository } from 'typeorm'
import app from '../src/app'
import { UserRepository } from '../src/repositories/UserRepository'

import "./connection"

describe("Tests to create a session with jwt", () => {
  test("Should return jwt with correctly credentials", async () => {
    const userRepository = getCustomRepository(UserRepository)

    const user = userRepository.create({
      email: 'test@mail.com',
      password: '123123123',
      username: 'test',
      role: 'visitant',
      avatar: 'https://www.nerdssauros.com.br/wp-content/uploads/2021/02/avatar.jpeg',
      confirmation_token: '3216548979846213'
    })

    await userRepository.save(user)

    console.log("USERS = ", user)
  })
})

