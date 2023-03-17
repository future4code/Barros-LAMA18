import { BandDatabase } from "../data/BandDatabase";
import { IncompleteBandDataRegister, UnaunthorizedUser } from "../error/BandErrors";
import { BaseError } from "../error/BaseError";
import { Band, bandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const bandDatabase = new BandDatabase()

export class BandBusiness {
    public authenticator = new Authenticator();

    public idGenerator = new IdGenerator(); 

    async registerBand (input: bandInputDTO, token: string) {
        try {
            const accessToken = this.authenticator.getData(token)
            
            if (accessToken.role !== UserRole.ADMIN) {
                throw new UnaunthorizedUser()
            }

            if (!input.name || !input.musicGenre || !input.responsible) {
                throw new IncompleteBandDataRegister()
            }

            const id = this.idGenerator.generate()

            const band = new Band(
                id,
                input.name,
                input.musicGenre,
                input.responsible
            )

            await bandDatabase.registerBand(band)
            
        } catch (error:any) {
            throw new BaseError(error.code || 400, error.message)
        }
    }
}