import { BaseError } from "../error/BaseError";
import { Band, bandInputDTO } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";
export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "table_bands_LAMA";

  async registerBand(band: Band): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: band.getId(),
          name: band.getName(),
          music_genre: band.getGenre(),
          responsible: band.getResponsible(),
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new BaseError(400, error.message || error.sqlMessage);
    }
  }
}
