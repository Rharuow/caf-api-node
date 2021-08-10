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

      return res.json({
        icon: "success",
        title: "Always come back",
        text: "checkout done",
        ...checkout,
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
