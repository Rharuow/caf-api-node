import request from 'supertest'
import app from '../src/app'

import "./connection"
import { CreateUserWithAccess } from './factory'

describe("Tests to create a session with jwt", () => {
  test("Should return jwt with correctly credentials", async () => {
    const user = await CreateUserWithAccess()

    console.log("email = ", user.email)
    console.log("password = ", user.password)

    const response = await request(app)
      .post('/v2/auth')
      .send({email: user.email, password: "123123123", role: user.role})

    console.log(response.body)

    expect(response.body).toHaveProperty("token")

  })
})

