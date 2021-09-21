import { Request, Response } from "express";
import { GetAccessesService } from "../../services/Access/GetAccessesService";

export class GetAccessesController {
  async handle(req: Request, res: Response) {
    const userID = req.headers.decodedSessionUserId as string;
    const { page, orderBy } = req.query as {
      page: string;
      orderBy?: { checkin: string };
    };

    const getAccessesService = new GetAccessesService();

    try {
      const accesses = await getAccessesService.execute(
        userID,
        parseInt(page),
        orderBy && orderBy
      );

      return res.json({
        accesses,
      });
    } catch (error) {
      throw new Error(
        `${error.message} Problem to controller checkins and checkouts historic`
      );
    }
  }
}
