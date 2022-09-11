import InputError from "../../errors/InputError";

export default class InvalidPageError extends InputError {
    public constructor(page: number) {
        super(`Invalid page provided: ${page}`);
        Object.setPrototypeOf(this, InvalidPageError.prototype);
    }
}
