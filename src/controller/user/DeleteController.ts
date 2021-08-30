import { Request, Response } from "express";

import DeleteUserService from "../../services/User/DeleteService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const deleteUserService = new DeleteUserService();

    try {
      const user = (await deleteUserService.execute(req.body.email)) as {};

      return res.json({ ...user });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export default DeleteUserController;
