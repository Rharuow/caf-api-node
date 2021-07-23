import { getCustomRepository } from "typeorm";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";
import UserCreateService, { IUser } from "../User/CreateService";

interface IEmployee {
  registration: string;
  userParams: IUser;
}

class CreateService {
  async execute({ registration, userParams }: IEmployee) {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    try {
      const userService = new UserCreateService();

      const user = await userService.execute(userParams);

      const employee = employeeRepository.create({
        registration,
        user_id: user.id,
      });

      await employeeRepository.save(employee);

      return employee;
    } catch (error) {
      return error.message;
    }
  }
}

export default CreateService;
