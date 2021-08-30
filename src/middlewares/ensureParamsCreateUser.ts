import { NextFunction, Request, Response } from "express";
import { ReadStream } from "fs";
import { validateEmail } from "../services/utils/validations";

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export function ensureParamsCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
  // const { username, email, photo } = req.body;

  // console.log("username = ", username);
  // console.log("email = ", email);
  // console.log("photo = ", photo);

  // if (
  //   username &&
  //   email &&
  //   photo &&
  //   username.length > 3 &&
  //   username.length < 20 &&
  //   validateEmail(email)
  // )
  return next();

  // return res.status(400).send("Some Params is worng");
}
