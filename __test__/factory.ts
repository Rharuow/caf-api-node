import { getCustomRepository } from "typeorm"
import { UserRepository } from "../src/repositories/UserRepository"
import bcrypt from "bcryptjs";
import CreateService from "../src/services/Access/CreateService";
import { GetAccessService } from "../src/services/Access/GetAccessService";
import { VisitantRepository } from "../src/repositories/VisitantRepository";
import { EmployeeRepository } from "../src/repositories/EmployeeRepository";
import { AccessRepository } from "../src/repositories/AccessRepository";

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

const createUser = async (avatar: string = 'https://www.nerdssauros.com.br/wp-content/uploads/2021/02/avatar.jpeg', username: string = 'test', role: string ='visitant', email: string = 'test@mail.com', confirmation_token: string = '123123123') => {
  const userRespository = getCustomRepository(UserRepository)

  const user = userRespository.create({avatar, email, role, username, confirmation_token})

  await userRespository.save(user)

  return user

}

const createVisitant = async (cpf: string = '000.000.000-00' ) => {
  const visitantRepos = getCustomRepository(VisitantRepository)

  const visitant = visitantRepos.create({cpf, user_id: (await createUser()).id})

  await visitantRepos.save(visitant)

  return visitant
}

const createEmployee = async (registration: string = '000000000000' ) => {
  const employeeRepository = getCustomRepository(EmployeeRepository)

  const employee = employeeRepository.create({registration, user_id: (await createUser()).id})

  await employeeRepository.save(employee)

  return employee
}

const createAccess = async () => {
  const accessRepository = getCustomRepository(AccessRepository)

  const access = accessRepository.create({alphanumeric: '000000000000', user_id: (await createUser()).id})

  await accessRepository.save(access)

  return access
}

export {CreateUserWithAccess, GetAccessActiveByUser, createUser, createVisitant, createEmployee, createAccess}