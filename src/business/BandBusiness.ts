import { BandDatabase } from "../data/BandDatabase";
import { ExpiredToken, MissingToken } from "../error/AuthenticatorErrors";
import {
  BandNotFound,
  DuplicateNameEntryError,
  IncompleteBandDataRegister,
  InputSearchError,
  InvalidNameBand,
  InvlidTypeOrLengthGenre,
  UnaunthorizedUser,
} from "../error/BandErrors";
import { BaseError } from "../error/BaseError";
import { Band, bandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
  public authenticator = new Authenticator();
  public idGenerator = new IdGenerator();
  public bandDatabase = new BandDatabase();

  async registerBand(input: bandInputDTO, token: string): Promise<void> {
    try {
      if (!input.name || !input.musicGenre || !input.responsible) {
        throw new IncompleteBandDataRegister();
      }

      const accessToken = this.authenticator.getData(token);

      if (accessToken.role !== UserRole.ADMIN) {
        throw new UnaunthorizedUser();
      }

      if((typeof input.musicGenre) !== 'string' || input.musicGenre.length > 15) {
        throw new InvlidTypeOrLengthGenre()
      }

      if((typeof input.name) !== 'string' || input.name.length < 3) {
        throw new InvalidNameBand()
      }
      
      const id = this.idGenerator.generate();

      const band = new Band(
        id,
        input.name,
        input.musicGenre,
        input.responsible
      );

      await this.bandDatabase.registerBand(band);
    } catch (error: any) {
      if (error.message.includes('Duplicate entry')) {
        throw new DuplicateNameEntryError()
      } else if(error.message.includes("jwt malformed")) {
        throw new MissingToken();
      } else if (error.message.includes("jwt expired")) {
        throw new ExpiredToken();
      } else {
        throw new BaseError(error.code || 400, error.message);
      }
    }
  }

  async getBandDetails (input: string):Promise<Band[]> {
    if (!input) {
      throw new InputSearchError()
    }
    const result = await this.bandDatabase.getBandDetails(input)
    if (result.length === 0) {
      throw new BandNotFound()
    }
    return result;
  }
}
