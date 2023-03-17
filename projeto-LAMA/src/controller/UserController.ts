import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password as string,
                role: req.body.role ? (req.body.role).toUpperCase() : undefined
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.createUser(input);

            res.status(201).send({ token });

        } catch (error:any) {
            res.status(error.code || 400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {
        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const userBusiness = new UserBusiness();
            const token = await userBusiness.getUserByEmail(loginData);

            res.status(201).send({ token });

        } catch (error:any) {
            res.status(error.code || 400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}