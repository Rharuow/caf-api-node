import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";

import { UserRepository } from "../../repositories/UserRepository";
import AccessCreateService from "../Access/CreateService";
import { sendCodeAccess } from "../utils/sendgrid";

export class ConfirmationCreateService {
  async execute(confirmation_token: string, password: string, role: string) {
    const userRepository = getCustomRepository(UserRepository);

    const createAccessService = new AccessCreateService();

    try {
      const password_hashed = await bcrypt.hash(password, 10);

      const user = await userRepository.findOne({
        where: { confirmation_token },
      });
      await userRepository.update(
        { confirmation_token },
        { password: password_hashed }
      );
      const accessCode = await createAccessService.execute(user.id);

      await sendCodeAccess({
        username: user.username,
        code: accessCode.alphanumeric,
        email: user.email,
        role: role,
        user,
      });
    } catch (err) {
      throw new Error(`Sorry, we can't confirm your signup: ${err}`);
    }
  }
}
