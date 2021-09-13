import { Request, Response } from "express";

import CreateService from "../../services/Employee/CreateService";
import { CreateTempUserService } from "../../services/TempUser/CreateTempUserService";

export class CreateEmployeeController {
  async handle(req: Request, res: Response) {
    // const createEmployeeService = new CreateService();

    const createTempUserService = new CreateTempUserService();

    try {
      // const employee = await createEmployeeService.execute({
      //   registration: req.body.registration,
      //   user: {
      //     email: req.body.email,
      //     username: req.body.username,
      //     avatar: req.file.buffer,
      //     role: "employee",
      //   },
      // });
      const tempUser = await createTempUserService.execute({
        registration: req.body.registration,
        user: {
          email: req.body.email,
          username: req.body.username,
          avatar: req.file.buffer,
          role: "employee",
        }
      })
      // return res.json({ user: { email: tempUser.email } });
      return res.json(tempUser);
    } catch (error) {
      return res.status(400).json({ messages: error.message });
    }
  }
}
