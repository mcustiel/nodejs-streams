import InputError from "../../errors/InputError";

export default class DateInTheFutureError extends InputError {
    public constructor(date: Date) {
        super(`The date provided is in the future: ${date.toISOString()}`);
        Object.setPrototypeOf(this, DateInTheFutureError.prototype);
    }
}
