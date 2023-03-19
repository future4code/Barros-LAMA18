import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { BandNotFound } from "../error/BandErrors";
import { BaseError } from "../error/BaseError";
import {
  IncompleteDataShowRegister,
  InvalidHours,
  InvalidShowDuration,
  InvalidShowTime,
  InvalidTIme,
  InvalidWeekDay,
} from "../error/ShowErrors";
import { Band } from "../model/Band";
import { Show, showInputDTO } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  public showDatabase = new ShowDatabase();
  public idGenerator = new IdGenerator();

  async postShow(input: showInputDTO) {
    try {
      if (
        !input.weekDay ||
        !input.bandId ||
        !input.endTime ||
        !input.startTime
      ) {
        throw new IncompleteDataShowRegister();
      }

      const verifybandId: Band[] = await new BandDatabase().getBandDetails(
        input.bandId
      );
      if (!verifybandId[0]) {
        throw new BandNotFound();
      }

      if (
        input.weekDay !== "sábado" &&
        input.weekDay !== "domingo" &&
        input.weekDay !== "sexta"
      ) {
        throw new InvalidWeekDay();
      }

      if (
        !Number.isInteger(input.startTime) ||
        !Number.isInteger(input.endTime)
      ) {
        throw new InvalidTIme();
      }

      if (input.startTime < 8 || input.endTime > 23) {
        throw new InvalidHours();
      }

      if (input.startTime >= input.endTime) {
        throw new InvalidHours();
      }

      if((input.endTime - input.startTime) > 4) {
        throw new InvalidShowDuration()
      }

      const showsOfDay = await this.showDatabase.searchShows(input.weekDay);

      let hours: number[] = [];
      const verify =
        showsOfDay &&
        showsOfDay.forEach((show) => {
          const times = show.end_time - show.start_time;
          hours.push(show.start_time);
          for (let i = 0; i < times; i++) {
            hours.push(show.start_time + i);
          }
        });

        console.log(hours)
        
        const verifyTIme = (time: number) => hours.includes(time);

        for (let i = 0; i < (input.endTime - input.startTime); i++) {
          if (verifyTIme(input.startTime) || verifyTIme(input.startTime + i)) {
            throw new InvalidShowTime();
          }       
        }

      const showId = this.idGenerator.generate();

      const newShow = new Show(
        showId,
        input.weekDay,
        input.startTime,
        input.endTime,
        input.bandId
      );

      await this.showDatabase.postShow(newShow);
    } catch (error: any) {
      throw new BaseError(error.code || 400, error.message);
    }
  }
}
