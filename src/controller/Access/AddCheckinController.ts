import { Request, Response } from "express";
import { AddCheckinService } from "../../services/Access/AddCheckinService";

export class AddCheckinController {
  async handle(req: Request, res: Response) {
    const addCheckinService = new AddCheckinService();

    try {
      await addCheckinService.execute(req.body.email, req.body.code);

      return res.json({
        icon: "success",
        title: "Welcome to TRTRN-21",
        text: "checking done",
      });
    } catch (error) {
      return res.status(401).json({
        icon: "error",
        title: "error",
        text: error.message,
      });
    }
  }
}
