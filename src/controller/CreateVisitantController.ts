import { Request, Response } from "express";
import cloudinary from "../../cloudinary";
import VisitantCreateService from "../services/Visitant/CreateService";

export class CreateVisitantController {
  async handle(req: Request, res: Response) {
    const visitantCreateService = new VisitantCreateService();

    // const avatar = await cloudinary.upload(req.file.buffer)

    console.log(req.body);

    const visitant = await visitantCreateService.execute({
      cpf: req.body.cpf,
      user: {
        email: req.body.email,
        username: req.body.username,
        avatar: "avatar.url",
      },
    });

    return res.json(visitant);
  }
}
