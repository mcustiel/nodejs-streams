import AbsentValueError from "./errors/AbsentValueError";

export default class Optional<T> {
    public constructor(private readonly value: T | null | undefined) { }

    public isPresent(): boolean {
        return !!this.value;
    }

    public get(): T {
        if (this.isPresent()) {
            return this.value as T;
        }

        throw new AbsentValueError();
    }

    public static absent(): Optional<null> {
        return new Optional(null);
    }
}
