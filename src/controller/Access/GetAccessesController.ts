import { Request, Response } from "express";
import { GetAccessesService } from "../../services/Access/GetAccessesService";
import { GetCheckinsService } from "../../services/Checkin/GetCheckinsService";
import { GetCheckoutsServices } from "../../services/Checkout/GetCheckoutsService";

export class GetAccessesController {
  async handle(req: Request, res: Response) {
    const userID = req.headers.decodedSessionUserId as string;

    const getAccessesService = new GetAccessesService();

    const getCheckinsService = new GetCheckinsService();

    const getCheckoutService = new GetCheckoutsServices();

    try {
      const accessesCheckouts = await getCheckoutService.execute(userID);

      const accessesCheckins = await getCheckinsService.execute(userID);

      return res.json({
        checkins: accessesCheckins,
        checkouts: accessesCheckouts,
      });
    } catch (error) {
      throw new Error(
        `${error.message} Problem to controller checkins and checkouts historic`
      );
    }
  }
}
