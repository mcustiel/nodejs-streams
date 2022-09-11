import DomainError from "../../errors/DomainError";

export default class InvalidCountError extends DomainError {
    public constructor(count: number) {
        super(`Invalid count: ${count}`);
        Object.setPrototypeOf(this, InvalidCountError.prototype);
    }
}
