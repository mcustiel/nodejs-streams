import InputError from "../../errors/InputError";

export default class InvalidDateError extends InputError {
    public constructor(date: string) {
        super(`Invalid date provided: ${date}`);
        Object.setPrototypeOf(this, InvalidDateError.prototype);
    }
}
