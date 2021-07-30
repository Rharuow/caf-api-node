import { NextFunction, Request, Response } from "express";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
}
