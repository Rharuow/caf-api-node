import { Request, Response } from "express";
import cloudinary from "../../cloudinary";
import VisitantCreateService from '../services/Visitant/CreateService';
import fs from "fs"


export class CreateVisitantController {
  async handle(req: Request, res: Response) {
    const visitantCreateService = new VisitantCreateService()

    const avatar = await cloudinary.upload(req.file.buffer) 

    const visitant = await visitantCreateService.execute({cpf: req.body.cpf, user: {email: req.body.email, username: req.body.username, avatar: avatar.url}})

    return res.json(visitant)

  }
}