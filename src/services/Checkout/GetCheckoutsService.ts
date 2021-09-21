import { getCustomRepository, Not, IsNull } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

export class GetCheckoutsServices {
  async execute(user_id: string, page: number = 0) {
    const accessRepositories = getCustomRepository(AccessRepository);

    try {
      const [accesses, total] = await accessRepositories.findAndCount({
        where: { user_id, checkout: Not(IsNull()) },
        skip: (page - 1) * 3,
        take: 3,
      });

      const checkout = accesses.map((access) => access.checkout);

      return checkout;
    } catch (error) {
      throw new Error(`${error.message}: Can't find accesses!`);
    }
  }
}
