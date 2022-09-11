export default class InvalidHttpRequestError extends Error {
    public constructor(msg?: string) {
        super(msg ?? "Invalid HTTP Request");
        Object.setPrototypeOf(this, InvalidHttpRequestError.prototype);
    }
}
