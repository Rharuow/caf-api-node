import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateSessionService {
  async execute(email: string, password: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOne({ where: { email, password } });

      const userAccess = user.accesses.find(
        (access) => access.user_id === user.id
      );

      return {
        username: user.username,
        photo: user.avatar,
        email: user.email,
        code: userAccess.alphanumeric,
      };
    } catch (error) {
      throw new Error("User's access not found");
    }
  }
}
