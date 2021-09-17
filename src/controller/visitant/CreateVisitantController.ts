import { Request, Response } from "express";
import { CreateTempUserService } from "../../services/TempUser/CreateTempUserService";


export class CreateVisitantController {
  async handle(req: Request, res: Response) {
    const createTempUserService = new CreateTempUserService();

    try {
      const tempUser = await createTempUserService.execute({
        cpf: req.body.cpf,
        user: {
          email: req.body.email,
          username: req.body.username,
          avatar: req.file.buffer,
          role: "visitant",
        }
      })

      return res.json({ user: { email: tempUser.email } });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
