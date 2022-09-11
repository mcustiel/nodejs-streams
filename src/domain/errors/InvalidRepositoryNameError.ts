export default class InvalidRepositoryNameError extends Error {
    public constructor(name: string) {
        super(`Invalid repository name: ${name}`);
        Object.setPrototypeOf(this, InvalidRepositoryNameError.prototype);
    }
}
