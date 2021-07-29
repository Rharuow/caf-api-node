import { getCustomRepository } from "typeorm";
import { AccessRepository } from "../../repositories/AccessRepository";

class CreateService {
  private generateCode(): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async execute(user_id: string) {
    const accessRepository = getCustomRepository(AccessRepository);
    try {
      const access = accessRepository.create({
        alphanumeric: this.generateCode(),
        user_id,
      });

      await accessRepository.save(access);

      return access;
    } catch (error) {
      throw new Error("Sorry we can't create a access!");
    }
  }
}

export default CreateService;
