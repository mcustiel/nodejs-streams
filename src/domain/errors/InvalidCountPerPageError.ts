import InputError from "../../errors/InputError";

export default class InvalidCountPerPageError extends InputError {
    public constructor(page: number) {
        super(`Invalid count per page provided: ${page}`);
        Object.setPrototypeOf(this, InvalidCountPerPageError.prototype);
    }
}
