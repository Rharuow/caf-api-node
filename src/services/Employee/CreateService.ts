import { getCustomRepository } from "typeorm";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";

interface IEmployee {
  registration: string;
  user: {
    id: string,
    email: string
  };
}

class CreateService {
  async execute({ registration, user }: IEmployee) {
    if (registration.length != 12)
      return { status: 200, message: "registration field invalid!" };

    const employeeRepository = getCustomRepository(EmployeeRepository);

    const employee = employeeRepository.create({
      registration,
      user_id: user.id,
    });

    try {
      await employeeRepository.save(employee);

      return {
        user: {
          email: user.email,
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
