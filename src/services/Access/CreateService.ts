
import { getCustomRepository } from 'typeorm';
import { AccessRepository } from '../../repositories/AccessRepository';

interface IAccess {
  alphanumeric: string
  user_id: string

}

class CreateService {
  async execute({alphanumeric, user_id}: IAccess) {
    const accessRepository = getCustomRepository(AccessRepository)
    try {
      const access = await accessRepository.create({alphanumeric, user_id})
  
      await accessRepository.save(access)
  
      return access
    } catch (error) {
      return error.message
    }
  }
}

export default CreateService