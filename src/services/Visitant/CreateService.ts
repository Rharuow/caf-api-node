import { getCustomRepository } from "typeorm";

import { VisitantRepository } from "../../repositories/VisitantRepository";
import { validateCpf } from "../utils/validations";

interface IVisitant {
  cpf: string;
  user: {
    id: string,
    email: string
  }
}

class CreateService {
  async execute({ cpf, user }: IVisitant) {
    if (!validateCpf(cpf))
      return { status: 200, message: "registration field invalid!" };

    const visitantRepository = getCustomRepository(VisitantRepository);

    const visitant = visitantRepository.create({
      cpf,
      user_id: user.id,
    });

    try {
      await visitantRepository.save(visitant);

      return {
        user: {
          email: user.email,
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
