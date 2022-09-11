import BaseError, { ErrorType } from "./BaseError";

export default class InputError extends Error implements BaseError {
    public constructor(msg?: string) {
        super(msg);
        Object.setPrototypeOf(this, InputError.prototype);
    }

    public getErrorType(): ErrorType {
        return ErrorType.INPUT_ERROR;
    }
}
