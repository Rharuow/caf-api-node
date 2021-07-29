import { getCustomRepository, QueryFailedError } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { sendConfirmationToken } from "../utils/sendgrid";

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
    });

    try {
      await userRepository.save(user);

      await sendConfirmationToken({
        code: confirmation_token,
        email,
        role,
        username,
      });

      return {
        ...user,
        status: {
          success: true,
          message: "User saved successfully",
        },
      };
    } catch (error) {
      if (error instanceof QueryFailedError)
        return {
          ...user,
          status: {
            success: false,
            message: "Sorry, we can't create a user!",
          },
        };
    }
  }
}

export default User;
