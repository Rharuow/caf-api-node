import { getCustomRepository } from "typeorm";
import cloudinary from "../../../cloudinary";
import { UserRepository } from "../../repositories/UserRepository";

class DeleteUserService {
  async execute(email: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOneOrFail({ where: { email } });

      if(!user) throw new Error("User not found")

      const imageCode = user.avatar.split('/').pop().split('.')[0]
      if(!imageCode) throw new Error("Image not found")
      
      await userRepository.delete({email})

      await cloudinary.destroy(imageCode)
      
      return { message: 'This user was deleted' };
    } catch (error) {
      return error.message;
    }
  }
}

export default DeleteUserService;
