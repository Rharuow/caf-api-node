import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateSessionService } from "../../services/Session/CreateSessionService";

export class CreateSessionController {
  async handle(req: Request, res: Response) {
    const createSessionService = new CreateSessionService();

    console.log(req.body);

    try {
      const user = await createSessionService.execute(
        req.body.email,
        req.body.password
      );

      const token = jwt.sign(
        { user: { username: user.username, code: user.code } },
        process.env.SECRET
      );

      return res.json({ user, token, code: user.code });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}
