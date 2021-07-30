import { getCustomRepository } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";
import { GetUserService } from "../User/GetUserService";
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
        { alphanumeric: "invalid", is_active: false, checkout: new Date() }
      );

      const newAccess = await createAccessService.execute(user.id);

      return newAccess;
    } catch (error) {
      throw new Error("Sorry, impossible to do Checkout ");
    }
  }
}
