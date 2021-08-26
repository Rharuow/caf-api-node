import { Request, Response } from "express";
import VisitantCreateService from "../../services/Visitant/CreateService";

export class CreateVisitantController {
  async handle(req: Request, res: Response) {
    const visitantCreateService = new VisitantCreateService();

    try {
      const visitant = await visitantCreateService.execute({
        cpf: req.body.cpf,
        user: {
          email: req.body.email,
          username: req.body.username,
          avatar: req.file.buffer,
          role: "visitant",
        },
      });

      return res.json({ user: { email: visitant.user.email } });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
