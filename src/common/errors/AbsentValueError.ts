import InfrastructureError from "../../errors/InfrastructureError";

export default class AbsentValueError extends InfrastructureError {
    public constructor() {
        super("Trying to access an absent value");
        Object.setPrototypeOf(this, AbsentValueError.prototype);
    }
}
