import { getCustomRepository, QueryFailedError } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { validateEmail } from "../utils/validations";

import { IUser } from "../../../interfaces";

class CreateUserService {
  async execute({ avatar, email, username, role, password }: IUser) {
    const userRepository = getCustomRepository(UserRepository);

    const user = userRepository.create({
      avatar,
      email,
      username,
      role,
      password,
    });

    if (!validateEmail(email))
      return {
        id: user.id,
        email: user.email,
        response: {
          status: 400,
          message: "email field invalid!",
        },
      };

    if (username.length < 3 || username.length > 20)
      return {
        id: user.id,
        email: user.email,
        response: {
          status: 400,
          message: "username field invalid!",
        },
      };

    try {
      await userRepository.save(user);

      return {
        ...user,
        response: {
          status: 200,
          message: "User saved successfully",
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof QueryFailedError)
        return {
          ...user,
          response: {
            status: 400,
            message: "Sorry, we can't create a user!",
          },
        };
    }
  }
}

export default CreateUserService;
