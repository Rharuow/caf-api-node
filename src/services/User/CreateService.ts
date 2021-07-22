import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

export interface IUser {
	username: string
	email: string
	avatar: string
}

class User {
	async execute({avatar, email, username}: IUser) {
		const userRepository = getCustomRepository(UserRepository)

		try {
			const user = userRepository.create({avatar, email, username})
			await userRepository.save(user)
			return user
		} catch (error) {
			return error.message
		}
	}
}

export default User