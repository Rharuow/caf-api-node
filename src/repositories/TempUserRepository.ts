import { EntityRepository, Repository } from "typeorm";
import { TempUser } from "../entities/TempUser";


@EntityRepository(TempUser)
export class TempUserRepository extends Repository<TempUser> {}