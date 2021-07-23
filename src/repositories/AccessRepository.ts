import { EntityRepository, Repository } from "typeorm";
import { Access } from "../entities/Access";

@EntityRepository(Access)
export class AccessRepository extends Repository<Access> {}
