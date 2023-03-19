export class BaseError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

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