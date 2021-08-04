import { NextFunction, Request, Response } from "express";
import { GetAccessService } from "../services/Access/GetAccessService";
import { GetUserService } from "../services/User/GetUserService";

export async function hasNotCheckin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const getAccessService = new GetAccessService();

  const getUserService = new GetUserService();

  try {
    const user = await getUserService.execute(req.body.email);

    const access = await getAccessService.execute(user.id);

    if (access.checkin == null) return next();

    return res.status(401).send("Checking had done");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
