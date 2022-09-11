import BaseError, { ErrorType } from "./BaseError";

export default class ServiceError extends Error implements BaseError {
    public constructor(msg?: string) {
        super(msg);
        Object.setPrototypeOf(this, ServiceError.prototype);
    }

    public getErrorType(): ErrorType {
        return ErrorType.SERVICE_ERROR;
    }
}
