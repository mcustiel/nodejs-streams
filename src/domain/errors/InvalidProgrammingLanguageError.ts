import InputError from "../../errors/InputError";

export default class InvalidProgrammingLanguageError extends InputError {
    public constructor() {
        super(`Invalid programming language provided`);
        Object.setPrototypeOf(this, InvalidProgrammingLanguageError.prototype);
    }
}
