import { getCustomRepository, Not, IsNull } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

export class GetCheckoutsServices {
  async execute(user_id: string) {
    const accessRepositories = getCustomRepository(AccessRepository);

    try {
      const accesses = await accessRepositories.find({
        where: { user_id, checkout: Not(IsNull()) },
      });

      const checkout = accesses.map((access) => access.checkout);

      return checkout;
    } catch (error) {
      throw new Error(`${error.message}: Can't find accesses!`);
    }
  }
}
