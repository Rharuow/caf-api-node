import { getCustomRepository } from "typeorm";

import { VisitantRepository } from "../../repositories/VisitantRepository";
import UserCreateService, { IUser } from "../User/CreateService";
import { validateCpf } from "../utils/validations";

interface IVisitant {
  cpf: string;
  user: IUser;
}

class CreateService {
  async execute({ cpf, user }: IVisitant) {
    if(validateCpf(cpf)) return {status:  200, message: "registration field invalid!"}

    const visitantRepository = getCustomRepository(VisitantRepository);

    const userCreateService = new UserCreateService();

    const userCreated = await userCreateService.execute({
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    });

    if (userCreated.response.status != 200 )
      throw new Error(userCreated.response.message);

    const visitant = visitantRepository.create({
      cpf,
      user_id: userCreated.id,
    });

    try {
      await visitantRepository.save(visitant);

      return {
        user: {
          email: userCreated.email,
        },
      };
    } catch (error) {
      throw new Error(
        "Sorry, we can't create a visitant with your credentials"
      );
    }
  }
}

export default CreateService;
