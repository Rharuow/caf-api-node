import { Request, Response } from "express";
import cloudinary from "../../cloudinary";
import CreateService from "../../services/Employee/CreateService";

export class CreateEmployeeController {
  async handle(req: Request, res: Response) {
    const createEmployeeService = new CreateService();

    const avatar = await cloudinary.upload(req.file.buffer);
    try {
      const employee = await createEmployeeService.execute({
        registration: req.body.registration,
        user: {
          email: req.body.email,
          username: req.body.username,
          avatar: avatar.url,
          role: "employee",
        },
      });
      return res.json({ user: { email: employee.user.email } });
    } catch (error) {
      return res.status(400).json({ messages: error.message });
    }
  }
}
