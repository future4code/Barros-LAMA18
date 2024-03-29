import { BaseError } from "./BaseError";

export class IncompleteUserDataSignup extends BaseError {
  constructor() {
    super(422, "Fill in the fields: name, email, password, role");
  }
}

export class IncompleteUserDataLogin extends BaseError {
  constructor() {
    super(422, "Fill in the fields: email and password");
  }
}

export class InvalidEmail extends BaseError {
  constructor() {
    super(422, "Invalid email address");
  }
}

export class InvalidName extends BaseError {
  constructor() {
    super(422, "Invalid name");
  }
}

export class InvalidPassword extends BaseError {
  constructor() {
    super(401, "Invalid Password!");
  }
}

export class DuplicateEmailEntry extends BaseError {
  constructor() {
    super(409, "Duplicate entry: This email already exists in batabase");
  }
}

export class UserNotFound extends BaseError {
  constructor() {
    super(404, "User not found");
  }
}
