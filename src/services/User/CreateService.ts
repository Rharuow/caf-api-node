import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import cloudinary from "../../../cloudinary";


export interface IUser {
    username: string
    email: string
    avatarFile: File
}

class User {
    async execute({avatarFile, email, username}: IUser) {
        const userRepository = getCustomRepository(UserRepository)

        try {
            // const avatar = await cloudinary.upload(
            //     avatarFile("photo", { maxSize: "1mb" })
            //   );

            // const user = await userRepository.create({avatar: avatar.url, email, username})

            // await userRepository.save(user)

            return username
        } catch (error) {
            return error.message
        }

        
    }
}

export default User