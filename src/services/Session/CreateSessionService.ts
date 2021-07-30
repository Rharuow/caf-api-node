import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";

import { UserRepository } from "../../repositories/UserRepository";
import { AccessRepository } from "../../repositories/AccessRepository";

export class CreateSessionService {
  async execute(email: string, password: string) {
    const userRepository = getCustomRepository(UserRepository);

    const accessRepository = getCustomRepository(AccessRepository);

    try {
      const user = await userRepository.findOne({
        where: { email },
      });

      const password_decoded = await bcrypt.compare(password, user.password);
      if (!password_decoded) throw new Error("Invalid password");

      const access = await accessRepository.findOne({
        where: { user_id: user.id, is_active: true },
      });

      return {
        id: user.id,
        username: user.username,
        photo: user.avatar,
        email: user.email,
        code: access.alphanumeric,
      };
    } catch (error) {
      throw new Error("Sorry we can't create a session!");
    }
  }
}
