import InvalidProgrammingLanguageError from "./errors/InvalidProgrammingLanguageError";

export default class ProgrammingLanguage {
    private readonly language: string;

    public constructor(language: string) {
        const l = language.trim();
        if (l.length === 0) {
            throw new InvalidProgrammingLanguageError();
        }
        this.language = l.toLowerCase();
    }

    public asString(): string {
        return this.language;
    }
}
