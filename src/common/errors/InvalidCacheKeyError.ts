import InfrastructureError from "../../errors/InfrastructureError";

export default class InvalidCacheKeyError extends InfrastructureError {
    public constructor(key: string) {
        super(`Invalid cache key: ${key}`);
        Object.setPrototypeOf(this, InvalidCacheKeyError.prototype);
    }
}
