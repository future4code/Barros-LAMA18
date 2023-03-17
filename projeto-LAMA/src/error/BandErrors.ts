import { BaseError } from "./BaseError";

export class IncompleteBandDataRegister extends BaseError {
    constructor() {
        super(422, "Fill in the fields: name, musicGenre, responsible")
    }
}

export class UnaunthorizedUser extends BaseError {
    constructor() {
        super(401, "Authorized only for admins")
    }
}

export class MissingToken extends BaseError {
    constructor(){
        super(401, "Must pass a valid token")
    }
}