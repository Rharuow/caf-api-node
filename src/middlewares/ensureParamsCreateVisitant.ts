import { NextFunction, Request, Response } from "express";
import { validateCpf } from "../services/utils/validations";

require("dotenv").config();

export function ensureParamsCreateVisitant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cpf } = req.body as { cpf: string };

  if (cpf && validateCpf(cpf)) return next();

  return res.status(400).send("Something wrong");
}
