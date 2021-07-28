import { getCustomRepository } from "typeorm";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";
import UserCreateService, { IUser } from "../User/CreateService";

interface IEmployee {
  registration: string;
  user: IUser;
}

class CreateService {
  async execute({ registration, user }: IEmployee) {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const userCreateService = new UserCreateService();

    const userCreated = await userCreateService.execute({
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    });

    if (!userCreated.status.success)
      throw new Error(userCreated.status.message);

    const employee = employeeRepository.create({
      registration,
      user_id: userCreated.id,
    });

    await employeeRepository.save(employee);

    return {
      user: {
        email: userCreated.email,
      },
    };
  }
}

export default CreateService;
