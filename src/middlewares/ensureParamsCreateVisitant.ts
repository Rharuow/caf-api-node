import { NextFunction, Request, Response } from "express";
import { validateCpf } from "../services/utils/validations";

require("dotenv").config();

export function ensureParamsCreateVisitant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cpf } = req.body as { cpf: string };

  console.log(process.env);

  if (cpf && validateCpf(cpf))
    return process.env.TS_NODE_DEV
      ? res.send("MIDDLEWARE ensureParamsCreateVisitant")
      : next();

  return res.status(400).send("Something wrong");
}
