import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";

import { UserRepository } from "../../repositories/UserRepository";
import { sendCodeAccess } from "../utils/sendgrid";
import { TempUserRepository } from "../../repositories/TempUserRepository";
import CreateAccessService from "../Access/CreateService";
import CreateUserService from "./CreateService";
import CreateEmployeeService from "../Employee/CreateService";
import CreateVisitantService from "../Visitant/CreateService";

export class ConfirmationCreateService {
  async execute(confirmation_token: string, password: string, role: string) {
    const tempUserRepository = getCustomRepository(TempUserRepository)

    const createAccessService = new CreateAccessService();
    const createUserService = new CreateUserService()
    const createEmployeeService = new CreateEmployeeService()
    const createVisitantService = new CreateVisitantService()

    try {

      const tempUser = await tempUserRepository.findOneOrFail({where: {confirmation_token}})
      
      const password_hashed = await bcrypt.hash(password, 10);

      const user = await createUserService.execute({
        avatar: tempUser.avatar,
        email: tempUser.email,
        role: tempUser.role,
        username: tempUser.username,
        password: password_hashed
      })

      role.includes("visitant") ?
        await createVisitantService.execute({cpf: tempUser.cpf, user}) 
        : 
        await createEmployeeService.execute({registration: tempUser.registration, user})

      const accessCode = await createAccessService.execute(user.id);

      await sendCodeAccess({
        username: tempUser.username,
        code: accessCode.alphanumeric,
        email: user.email,
        role: role,
        user: tempUser,
      });
    } catch (err) {
      throw new Error(`Sorry, we can't confirm your signup: ${err}`);
    }
  }
}
