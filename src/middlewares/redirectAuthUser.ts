import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export async function redirectAuthUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = req.body;

  const userRepository = getCustomRepository(UserRepository);

  try {
    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (role !== user.role)
      return res.status(401).json({ message: "Wrong role!" });

    return next();
  } catch (error) {
    return res.status(404).json({ message: "Error user auth redirect role" });
  }
}
