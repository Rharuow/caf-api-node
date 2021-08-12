import { NextFunction, Request, Response } from "express";
import { validateEmail } from "../services/utils/validations";

export function ensureParamsSessionCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, role } = req.body as {
    email: string;
    password: string;
    role: string;
  };

  if (
    email &&
    password &&
    role &&
    validateEmail(email) &&
    (role === "visitant" || role === "employee")
  )
    return next();

  return res.status(400).send("Something wrong");
}
