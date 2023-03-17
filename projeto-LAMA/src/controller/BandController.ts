import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { bandInputDTO } from "../model/Band";

const bandBusiness = new BandBusiness();
export class BandController {

  async registerBand(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;
      const input: bandInputDTO = {
        name: req.body.name,
        musicGenre: req.body.musicGenre,
        responsible: req.body.responsible,
      };
      await bandBusiness.registerBand(input, token);

      res.status(201).send({ message: "Band included in the database" });
    } catch (error: any) {
      res.status(error.code || 400).send({ error: error.message });
    }
  }
}
