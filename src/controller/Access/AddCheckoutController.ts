import { Request, Response } from "express";
import { AddCheckoutService } from "../../services/Access/AddCheckoutService";

export class AddCheckoutController {
  async handle(req: Request, res: Response) {
    const addCheckoutService = new AddCheckoutService();

    try {
      const checkout = await addCheckoutService.execute(
        req.body.email,
        req.body.code
      );

      return res.json({ checkout });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  }
}
