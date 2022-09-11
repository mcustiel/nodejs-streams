import BaseError, { ErrorType } from "./BaseError";

export default class InfrastructureError extends Error implements BaseError {
    public constructor(msg?: string) {
        super(msg);
        Object.setPrototypeOf(this, InfrastructureError.prototype);
    }

    public getErrorType(): ErrorType {
        return ErrorType.INFRASTRUCTURE_ERROR;
    }
}
