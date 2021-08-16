import { getCustomRepository, QueryFailedError } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { sendConfirmationToken } from "../utils/sendgrid";
import { validateEmail } from "../utils/validations";

export interface IUser {
  username: string;
  email: string;
  avatar: string;
  role: string;
}

class User {
  private generateConfirmationToken(): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 28; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async execute({ avatar, email, username, role }: IUser) {
    const userRepository = getCustomRepository(UserRepository);

    const confirmation_token = this.generateConfirmationToken();

    const user = userRepository.create({
      avatar,
      email,
      username,
      confirmation_token,
      role,
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

      await sendConfirmationToken({
        code: confirmation_token,
        email,
        role,
        username,
        user,
      });

      return {
        ...user,
        response: {
          status: 200,
          message: "User saved successfully",
        },
      };
    } catch (error) {
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

export default User;
