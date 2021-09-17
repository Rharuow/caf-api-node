import { getCustomRepository, QueryFailedError } from "typeorm";

import { TempUserRepository } from "../../repositories/TempUserRepository";
import { IUserCreateService } from "../../../interfaces";
import cloudinary from "../../../cloudinary";
import { UserRepository } from "../../repositories/UserRepository";
import { validateCpf, validateEmail } from "../utils/validations";
import { sendConfirmationToken } from "../utils/sendgrid";
import { VisitantRepository } from "../../repositories/VisitantRepository";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";


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
    const visitantRepository = getCustomRepository(VisitantRepository)
    const employeeRepository = getCustomRepository(EmployeeRepository)

    const validateField = user.role.includes('visitant') ? validateCpf(cpf) : registration.length === 12

    if(!validateField) throw new Error(`${user.role.includes('visitant') ? 'Cpf' : 'Registration'} field validation failed`)

    const emailValidation = validateEmail(user.email)

    if(!emailValidation) throw new Error("Email validation failed")

    if (user.username.length < 3 || user.username.length > 20) throw new Error("username field invalid!")

    const emailVerified = await userRepository.find({where: { email: user.email}})
    const usernameVerified = await userRepository.find({where: { username: user.username}})
    const uniqueRegister = user.role.includes('visitant') ? await visitantRepository.find({where: { cpf }}) : await employeeRepository.find({where: { registration }}) 

    if(emailVerified.length > 0 || usernameVerified.length > 0 || uniqueRegister.length > 0) throw new Error("User already exists")

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
    try {

      const tempUserSaved = await tempUserRepository.save(tempUser)
      
      if (tempUserSaved) {
        await sendConfirmationToken({
          code: confirmation_token,
          email: user.email,
          role: user.role,
          username: user.username,
          user: tempUser
        });
      }

      return {
        ...tempUser,
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