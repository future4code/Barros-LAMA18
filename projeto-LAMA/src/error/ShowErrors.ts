import { BaseError } from "./BaseError";

export class IncompleteDataShowRegister extends BaseError {
    constructor() {
      super(422, "Fill in the fields: weekDay, startTime, endTime, bandId");
    }
  }

export class InvalidWeekDay extends BaseError {
    constructor() {
        super(422, "weekDay must be one of these: sexta, sábado, domingo")
    }
 }

 export class InvalidTIme extends BaseError {
    constructor() {
        super(422, "startTime and endTime must be a integer number")
    }
 }

 export class InvalidHours extends BaseError {
    constructor() {
        super(422, "Invalid hours: the shows will take place between 08:00 and 23:00.")
    }
 }

 export class InvalidShowTime extends BaseError {
    constructor() {
        super(409, "The specified show time is not available")
    }
 }

 export class InvalidShowDuration extends BaseError {
    constructor() {
        super(422, "Show duration should not exceed 4 hours")
    }
 }