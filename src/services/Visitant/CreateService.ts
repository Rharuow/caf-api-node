import { getCustomRepository } from "typeorm";
import { VisitantRepository } from "../../respositories/VisitantRepository";


interface IVisitant {
    cpf: string
    user_id: string
}

export class CreateService {
    async execute({cpf, user_id} : IVisitant){
        const visitantRepository = getCustomRepository(VisitantRepository)

        const visitant = await visitantRepository.find({where: {cpf}})
    }
}