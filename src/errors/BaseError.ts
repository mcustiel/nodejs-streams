export enum ErrorType {
    UNKNOWN_ERROR = 0,
    INPUT_ERROR = 1,
    DOMAIN_ERROR = 2,
    INFRASTRUCTURE_ERROR = 3,
    SERVICE_ERROR = 4,
}

export default interface BaseError extends Error {
    getErrorType(): ErrorType;
}
