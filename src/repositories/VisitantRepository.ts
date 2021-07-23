import { EntityRepository, Repository } from "typeorm";
import { Visitant } from "../entities/Visitant";

@EntityRepository(Visitant)
export class VisitantRepository extends Repository<Visitant> {}
