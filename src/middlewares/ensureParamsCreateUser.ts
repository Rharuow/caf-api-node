import { NextFunction, Request, Response } from "express";
import { validateEmail } from "../services/utils/validations";

require("dotenv").config();

export function ensureParamsCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email } = req.body as { username: string; email: string };

  if (
    username &&
    email &&
    username.length > 3 &&
    username.length < 20 &&
    validateEmail(email)
  )
    return !process.env.TS_NODE_DEV
      ? res.send("MIDDLEWARE ensureParamsCreateUser")
      : next();

  return res.status(400).send("Some Params is worng");
}
