import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

interface IUserSession {
  user: { username: string; id: string; code: string };
  iat: number;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const { user } = jwt.verify(
    token.split(" ")[1],
    process.env.SECRET
  ) as IUserSession;

  req.headers.decodedSessionUserId = user.id;

  return next();
}
