import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { showInputDTO } from "../model/Show";

const showBusiness = new ShowBusiness();

export class ShowController {
    async postShow(req: Request, res: Response):Promise<void> {
        try {
            const token: string = req.headers.authorization as string;
            const input: showInputDTO = {
                weekDay: req.body.weekDay? (req.body.weekDay).toLowerCase() : undefined,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId
            }
            await showBusiness.postShow(input, token)
            
            res.status(201).send({message: "Event added successfully!"})
        } catch (error:any) {
            res.status(error.code || 400).send({ error: error.message })
        }
    }

    async gethowsByDay(req: Request, res: Response):Promise<void> {
        try {
            const weekDay = req.params.weekDay
            const result = await showBusiness.getShowsByDay(weekDay)

            res.status(200).send({result: result})
        } catch (error:any) {
            res.status(error.code || 400).send({ error: error.message }) 
        }
    }
}