import AbsentValueError from "./errors/AbsentValueError";

// This is not extremely needed in typescript, since it alerts
// of unchecked nulls or undefineds. But I find it really explicit
// to say that a method returns an optional value.
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
