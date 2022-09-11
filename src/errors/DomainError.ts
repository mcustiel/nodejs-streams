import BaseError, { ErrorType } from "./BaseError";

export default class DomainError extends Error implements BaseError {
    public constructor(msg?: string) {
        super(msg);
        Object.setPrototypeOf(this, DomainError.prototype);
    }

    public getErrorType(): ErrorType {
        return ErrorType.DOMAIN_ERROR;
    }
}
