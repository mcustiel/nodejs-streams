export default class ObjectNotCachedError extends Error {
    public constructor(key: string) {
        super(`Trying to access an object which is not in cache: ${key}`);
        Object.setPrototypeOf(this, ObjectNotCachedError.prototype);
    }
}
