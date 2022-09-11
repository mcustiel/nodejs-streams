export class InvalidPortError extends Error {
    public constructor(port: number) {
        super(`Invalid port: ${port}.`);
        Object.setPrototypeOf(this, InvalidPortError.prototype);
    }
}
