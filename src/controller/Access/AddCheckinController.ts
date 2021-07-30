import { Request, Response } from "express";
import { AddCheckinService } from "../../services/Access/AddCheckinService";

export class AddCheckinController {
  async handle(req: Request, res: Response) {
    console.log(req.body);
    const addCheckinService = new AddCheckinService();

    try {
      await addCheckinService.execute(req.body.email, req.body.code);

      return res.json({ message: "checking done" });
    } catch (error) {
      return res.status(401).json({ meesage: error.message });
    }
  }
}
