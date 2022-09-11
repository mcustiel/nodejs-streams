import InputError from "./InputError";

export default class MissingFiltersError extends InputError {
    public constructor() {
        super(`Missing filters in request`);
        Object.setPrototypeOf(this, MissingFiltersError.prototype);
    }
}
