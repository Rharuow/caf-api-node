import { Request, Response } from "express";
import { ConfirmationCreateService as UserConfirmationCreateService } from "../../services/User/ConfirmationCreateService";

export class ConfirmationSignupController {
  async handle(req: Request, res: Response) {
    const userConfirmationCreateService = new UserConfirmationCreateService();

    try {
      await userConfirmationCreateService.execute(
        req.body.token,
        req.body.password,
        req.body.role
      );

      return res.json({ message: "User cadastrado com sucesso" });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}
