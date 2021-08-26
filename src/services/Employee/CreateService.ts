import { getCustomRepository } from "typeorm";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";
import UserCreateService from "../User/CreateService";

import { IUserCreateService } from "../../../interfaces";
interface IEmployee {
  registration: string;
  user: IUserCreateService;
}

class CreateService {
  async execute({ registration, user }: IEmployee) {
    if (registration.length != 12)
      return { status: 200, message: "registration field invalid!" };

    const employeeRepository = getCustomRepository(EmployeeRepository);

    const userCreateService = new UserCreateService();

    const userCreated = await userCreateService.execute({
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    });

    if (userCreated.response.status != 200)
      throw new Error(userCreated.response.message);

    const employee = employeeRepository.create({
      registration,
      user_id: userCreated.id,
    });

    try {
      await employeeRepository.save(employee);

      return {
        user: {
          email: userCreated.email,
        },
      };
    } catch (error) {
      throw new Error(
        "Sorry, wen can't create a employee with your credentials."
      );
    }
  }
}

export default CreateService;
