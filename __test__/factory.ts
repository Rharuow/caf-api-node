import { getCustomRepository, getRepository } from "typeorm"
import { UserRepository } from "../src/repositories/UserRepository"
import bcrypt from "bcryptjs";
import CreateService from "../src/services/Access/CreateService";
import { AccessRepository } from "../src/repositories/AccessRepository";

const CreateUserWithAccess = async () => {
  const userRepository = getCustomRepository(UserRepository)

  const password_hashed = await bcrypt.hash('123123123', 10);

  const user = userRepository.create({
    email: 'test@mail.com',
    password: password_hashed,
    username: 'test',
    role: 'visitant',
    avatar: 'https://www.nerdssauros.com.br/wp-content/uploads/2021/02/avatar.jpeg',
    confirmation_token: '3216548979846213'
  })

  await userRepository.save(user)

  await CreateAccess(user.id)

  const accessRepository = getRepository(AccessRepository)

  const access = await accessRepository.findOne({where: {user_id: user.id}})
  
  return {user, access}
}

const CreateAccess = async (userId: string) => {

  const createAccessService = new CreateService()

  const access = await createAccessService.execute(userId)

}

export {CreateUserWithAccess}