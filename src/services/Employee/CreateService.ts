
import { getCustomRepository } from 'typeorm';
import { EmployeeRepository } from '../../repositories/EmployeeRepository';

interface IEmployee {
  registration: string
  user_id: string
}

class CreateService {
  async execute({registration, user_id}: IEmployee){
    const employeeRepository = getCustomRepository(EmployeeRepository)

    try {
      const employee = employeeRepository.create({registration, user_id})

      await employeeRepository.save(employee)

      return employee
    } catch (error) {
      return error.message
    }

    

  }
}

export default CreateService