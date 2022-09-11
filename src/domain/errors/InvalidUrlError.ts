export default class InvalidUrlError extends Error {
    public constructor(url: string) {
        super(`Invalid URL: ${url}`);
        Object.setPrototypeOf(this, InvalidUrlError.prototype);
    }
}
