import { Request, Response } from "express";
import { GetCodeAccessService } from "../../services/Access/GetCodeAccessService";

export class GetAccessCodeController {
  async handle(req: Request, res: Response) {
    const getAccessCodeService = new GetCodeAccessService();

    const userID = req.headers.decodedSessionUserId as string;

    const code = await getAccessCodeService.execute(userID);

    return res.status(200).json({ code });
  }
}
