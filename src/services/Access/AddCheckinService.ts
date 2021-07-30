import { getCustomRepository } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";
import { GetUserService } from "../User/GetUserService";

export class AddCheckinService {
  async execute(email: string, alphanumeric: string) {
    const accessRepository = getCustomRepository(AccessRepository);

    const getUserService = new GetUserService();

    try {
      const user = await getUserService.execute(email);

      await accessRepository.findOneOrFail({
        where: { user_id: user.id, checkin: null },
      });

      await accessRepository.update(
        { user_id: user.id, alphanumeric },
        { checkin: new Date() }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
