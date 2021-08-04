import { getCustomRepository } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

export class GetAccessService {
  async execute(userID: string) {
    const accessRepository = getCustomRepository(AccessRepository);

    try {
      const access = await accessRepository.findOneOrFail({
        where: {
          user_id: userID,
          is_active: true,
        },
      });

      return access;
    } catch (error) {
      return error;
    }
  }
}
