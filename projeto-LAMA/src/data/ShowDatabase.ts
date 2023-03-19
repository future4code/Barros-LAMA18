import { BaseError } from "../error/BaseError";
import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "table_shows_LAMA";

  async searchShows(weekDay: string): Promise<any[]> {
    try {
      const result = this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where('week_day', weekDay)

      return result;
    } catch (error: any) {
      throw new BaseError(400, error.message || error.sqlMessage);
    }
  }

  async postShow (input: Show) {
    try {
        await this.getConnection()
        .insert({
            id: input.getId(),
            week_day: input.getWeekDay(),
            start_time: input.getStartTime(),
            end_time: input.getEndTime(),
            band_id: input.getBandId()
        })
        .into(ShowDatabase.TABLE_NAME)
    } catch (error:any) {
        throw new BaseError(400, error.message || error.sqlMessage);
    }
  }
}
