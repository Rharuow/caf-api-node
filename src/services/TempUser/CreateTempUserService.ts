import { getCustomRepository } from "typeorm";

import { TempUserRepository } from "../../repositories/TempUserRepository";
import { IUserCreateService } from "../../../interfaces";
import cloudinary from "../../../cloudinary";
import { UserRepository } from "../../repositories/UserRepository";

interface ITempUser {
  cpf?: string;
  registration?: string;
  user: IUserCreateService;
}


export class CreateTempUserService {

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

  async execute({ cpf, registration, user }: ITempUser) {
    const tempUserRepository = getCustomRepository(TempUserRepository)
    const userRepository = getCustomRepository(UserRepository)

    const userVerified = await userRepository.find({where: { email: user.email}})

    if(userVerified.length > 0) throw new Error("User already exists")

    const confirmation_token = this.generateConfirmationToken();

    const avatarUploaded = await cloudinary.upload(user.avatar);

    const tempUser = tempUserRepository.create({
      avatar: avatarUploaded.url,
      cpf: user.role.includes('visitant') ? cpf : '',
      registration: user.role.includes('employee') ? registration : '',
      role: user.role, 
      username: user.username,
      email: user.email,
      confirmation_token
    })

    return tempUser
  }
}