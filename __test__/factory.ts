import { getCustomRepository } from "typeorm"
import { UserRepository } from "../src/repositories/UserRepository"
import bcrypt from "bcryptjs";
import CreateService from "../src/services/Access/CreateService";
import { GetAccessService } from "../src/services/Access/GetAccessService";

const CreateUserWithAccess = async (
  password = '123123123',
  email = 'test@mail.com',
  role ='visitant',
  avatar = 'https://www.nerdssauros.com.br/wp-content/uploads/2021/02/avatar.jpeg',
 ) => {
  const userRepository = getCustomRepository(UserRepository)

  const password_hashed = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    email,
    password: password_hashed,
    username: 'test',
    role,
    avatar,
    confirmation_token: '3216548979846213'
  })

  await userRepository.save(user)

  await CreateAccess(user.id)

  return user
}

const CreateAccess = async (userId: string) => {

  const createAccessService = new CreateService()

  const access = await createAccessService.execute(userId)

}

const GetAccessActiveByUser = async () => {
  const getAccessService = new GetAccessService()

  const user = await CreateUserWithAccess()

  const accessByUser = await getAccessService.execute(user.id)

  return accessByUser
}

export {CreateUserWithAccess, GetAccessActiveByUser}