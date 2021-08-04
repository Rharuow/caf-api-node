import { getCustomRepository } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

export class GetCodeAccessService {
  async execute(user_id: string) {
    const accessRepository = getCustomRepository(AccessRepository);

    try {
      const access = await accessRepository.findOneOrFail({
        where: { user_id, is_active: true },
      });

      return access.alphanumeric;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
