import { NextFunction, Request, Response } from "express";
require("dotenv").config();

export function ensureParamsCreateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { registration } = req.body as { registration: string };

  if (registration && registration.length === 12)
    return process.env.TS_NODE_DEV
      ? res.send("MIDDLEWARE ensureParamsCreateEmployee")
      : next();

  return res.status(400).send("Some Params is worng");
}
