import { BaseError } from "./BaseError";

export class MissingToken extends BaseError {
    constructor() {
      super(401, "Must pass a valid token");
    }
  }
  
  export class ExpiredToken extends BaseError {
    constructor() {
      super(401, "Token has expired. Please re-login")
    }
  }




