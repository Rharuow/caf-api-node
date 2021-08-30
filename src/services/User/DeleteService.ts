import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

class DeleteUserService {
  async execute(email: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOneOrFail({ where: { email } });

      return user;
    } catch (error) {
      return error.message;
    }
  }
}

export default DeleteUserService;
