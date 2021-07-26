import { Request, Response } from "express";
import cloudinary from "../../cloudinary";
import VisitantCreateService from "../services/Visitant/CreateService";

export class CreateVisitantController {
  async handle(req: Request, res: Response) {
    const visitantCreateService = new VisitantCreateService();

    // const avatar = await cloudinary.upload(req.file.buffer)
    try {
      const visitant = await visitantCreateService.execute({
        cpf: req.body.cpf,
        user: {
          email: req.body.email,
          username: req.body.username,
          avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png",
          role: 'visitant'
        },
      });
  
      return res.json(visitant);
      
    } catch (error) {
      return res.status(400).json({message: error.message})
    }
  }
}
