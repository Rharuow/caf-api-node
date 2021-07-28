import { getCustomRepository } from "typeorm";

import { VisitantRepository } from "../../repositories/VisitantRepository";
import UserCreateService, { IUser } from "../User/CreateService";

interface IVisitant {
  cpf: string;
  user: IUser;
}

class CreateService {
  async execute({ cpf, user }: IVisitant) {
    const visitantRepository = getCustomRepository(VisitantRepository);

    const userCreateService = new UserCreateService();

    const userCreated = await userCreateService.execute({
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    });

    if (!userCreated.status.success)
      throw new Error(userCreated.status.message);

    const visitant = visitantRepository.create({
      cpf,
      user_id: userCreated.id,
    });

    await visitantRepository.save(visitant);

    return {
      user: {
        email: userCreated.email,
      },
    };
  }
}

export default CreateService;
