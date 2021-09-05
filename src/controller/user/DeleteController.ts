import { Request, Response } from "express";

import DeleteUserService from "../../services/User/DeleteService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const deleteUserService = new DeleteUserService();

    try {
      return res.json(await deleteUserService.execute(req.body.email));
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export default DeleteUserController;
