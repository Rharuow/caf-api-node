import { getCustomRepository } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";


export class GetAccessesService {
    async execute(userID: string) {
        const accessRepository = getCustomRepository(AccessRepository)

        try {
            
            const access = await accessRepository.find({where: {user_id: userID}})

            return access

        } catch (error) {
            
            throw new Error(`${error.message} = Acesso não encontrado`)

        }
    }
}