import { getCustomRepository, IsNull, Not } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

export class GetAccessesService {
  async execute(
    user_id: string,
    page: number = 1,
    orderBy: {} = {
      checkin: "DESC",
    },
    perPage: number = 3
  ) {
    const accessRepository = getCustomRepository(AccessRepository);

    try {
      const [accesses, total] = await accessRepository.findAndCount({
        order: orderBy,
        where: { user_id, checkin: Not(IsNull()) },
        skip: (page - 1) * perPage,
        take: perPage,
      });

      return { result: accesses, total };
    } catch (error) {
      throw new Error(`${error.message} = Acesso não encontrado`);
    }
  }
}
