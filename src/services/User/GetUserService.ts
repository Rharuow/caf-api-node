import { getCustomRepository } from "typeorm";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

export class GetUserService {
  async execute(email: string, password?: string) {
    const userRepository = getCustomRepository(UserRepository);

    let user: User;

    try {
      if (password)
        user = await userRepository.findOne({
          where: { email, password },
        });
      else
        user = await userRepository.findOne({
          where: { email },
        });

      return user;
    } catch (error) {
      throw new Error("Sorry, User not found!");
    }
  }
}
