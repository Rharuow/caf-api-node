import { getCustomRepository, IsNull, Not } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

export class GetCheckinsService {
  async execute(user_id: string) {
    const accessRepositories = getCustomRepository(AccessRepository);

    try {
      const accesses = await accessRepositories.find({
        where: { user_id, checkin: Not(IsNull()) },
      });

      const checkin = accesses.map((access) => access.checkin);

      return checkin;
    } catch (error) {
      throw new Error(`${error.message}: Can't find accesses!`);
    }
  }
}
