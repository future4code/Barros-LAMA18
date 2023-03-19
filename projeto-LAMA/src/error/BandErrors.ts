import { BaseError } from "./BaseError";
export class IncompleteBandDataRegister extends BaseError {
  constructor() {
    super(422, "Fill in the fields: name, musicGenre, responsible");
  }
}
export class UnaunthorizedUser extends BaseError {
  constructor() {
    super(401, "Authorized only for admins");
  }
}
export class MissingToken extends BaseError {
  constructor() {
    super(401, "Must pass a valid token");
  }
}

export class BandNotFound extends BaseError {
  constructor() {
    super(404, "Band not found");
  }
}

export class InputSearchError extends BaseError {
  constructor() {
    super(422, "Must to pass a query: name or id");
  }
}

export class DuplicateNameEntryError extends BaseError {
  constructor() {
    super(409, "Duplicate entry for name Band name already registered.")
  }
}

export class InvalidNameBand extends BaseError {
  constructor() {
    super(422, "Invalid too short name")
  }
}