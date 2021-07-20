import { Request, Response } from "express";
import VisitantCreateService from '../services/Visitant/CreateService';


export class CreateVisitantController {
  async handle(req: Request, res: Response) {
    const visitantCreateService = new VisitantCreateService()

    console.log(req.file)
    console.log(req.body)

    // const visitant = await visitantCreateService.execute({cpf: req.body.cpf, user: {email: req.body.email, username: req.body.username, avatar: req.body.avatar}})

    

  }
}