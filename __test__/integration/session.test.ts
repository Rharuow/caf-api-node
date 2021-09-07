import request from 'supertest'
import app from '../../src/app'

import "../connection"
import { CreateUserWithAccess } from '../factory'

describe("Tests to create a session with jwt", () => {
  test("Should return jwt with correctly credentials", async () => {
    await CreateUserWithAccess()

    const response = await request(app)
      .post('/v2/auth')
      .send({email: 'test@mail.com', password: "123123123", role: 'visitant'})

    expect(response.body).toHaveProperty("token")

  })
})

