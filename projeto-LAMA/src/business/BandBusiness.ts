import { BandDatabase } from "../data/BandDatabase";
import {
  BandNotFound,
  DuplicateNameEntryError,
  IncompleteBandDataRegister,
  InputSearchError,
  InvalidNameBand,
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
      const accessToken = this.authenticator.getData(token);

      if (accessToken.role !== UserRole.ADMIN) {
        throw new UnaunthorizedUser();
      }

      if (!input.name || !input.musicGenre || !input.responsible) {
        throw new IncompleteBandDataRegister();
      }

      if(input.name.length < 3) {
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
