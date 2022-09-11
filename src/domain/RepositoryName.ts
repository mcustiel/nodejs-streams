import InvalidRepositoryNameError from "./errors/InvalidRepositoryNameError";

export default class RepositoryName {
    private static readonly REPO_NAME_PATTERN = /^[a-z0-9][a-z0-9\-_\.]*\/[a-z0-9][a-z0-9\-_\.]*$/i;
    private readonly name: string;

    public constructor(name: string) {
        if (name.length === 0 || !RepositoryName.REPO_NAME_PATTERN.test(name)) {
            throw new InvalidRepositoryNameError(name);
        }
        this.name = name;
    }

    public asString(): string {
        return this.name;
    }
}
