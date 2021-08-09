import { Request, Response } from "express";
import { GetAccessesService } from "../../services/Access/GetAccessesService";



export class GetAccessesController {
    async handle(req: Request, res: Response) {
        const userID = req.headers.decodedSessionUserId as string

        const getAccessesService = new GetAccessesService()
        
        try {
            const accesses = await getAccessesService.execute(userID)

            const checkins = accesses.map((access) => access.checkin)

            const checkouts = accesses.map((access) => access.checkout)
            
            return res.json({checkins, checkouts})
        } catch (error) {
            throw new Error(`${error.message} Problem to controller checkins and checkouts historic`)
        }
    }
}