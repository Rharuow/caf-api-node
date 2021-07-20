import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../respositories/UserRepository";


interface IUser {
    username: string
    email: string
    avatar: string
}

export class User {
    async execute({avatar, email, username}: IUser) {
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.create({avatar, email, username})

        await userRepository.save(user)

        return user
    }
}