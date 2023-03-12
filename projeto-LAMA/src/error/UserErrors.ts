import { BaseError } from "./BaseError";

export class InputMissingError extends BaseError {
    constructor(){
        super(422, "Precis informar: name, email, password, role")
    }
}