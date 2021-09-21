import { getCustomRepository, IsNull, Not } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

export class GetCheckinsService {
  async execute(user_id: string, page: number = 0) {
    const accessRepositories = getCustomRepository(AccessRepository);

    try {
      const [accesses, total] = await accessRepositories.findAndCount({
        where: { user_id, checkin: Not(IsNull()) },
        skip: (page - 1) * 3,
        take: 3,
      });

      const checkin = accesses.map((access) => access.checkin);

      return checkin;
    } catch (error) {
      throw new Error(`${error.message}: Can't find accesses!`);
    }
  }
}
