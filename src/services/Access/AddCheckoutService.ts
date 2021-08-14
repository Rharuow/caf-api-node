import { getCustomRepository } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";
import { GetUserService } from "../User/GetUserService";
import { sendCodeAccess } from "../utils/sendgrid";
import CreateService from "./CreateService";

export class AddCheckoutService {
  async execute(email: string, alphanumeric: string) {
    const accessRepository = getCustomRepository(AccessRepository);

    const getUserService = new GetUserService();

    const createAccessService = new CreateService();

    try {
      const user = await getUserService.execute(email);

      const access = await accessRepository.findOne({
        where: { alphanumeric, user_id: user.id },
      });

      if (!access.checkin)
        throw new Error("Sorry but you need to do a checkin before");

      await accessRepository.update(
        { user_id: user.id, alphanumeric },
        {
          alphanumeric: `${new Date()}`,
          is_active: false,
          checkout: new Date(),
        }
      );

      const newAccess = await createAccessService.execute(user.id);

      await sendCodeAccess({
        username: user.username,
        code: newAccess.alphanumeric,
        email: user.email,
        role: user.role,
        user,
      });

      return newAccess;
    } catch (error) {
      throw new Error(`${error.message}: Sorry, impossible to do Checkout `);
    }
  }
}
