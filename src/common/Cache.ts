import Optional from "./Optional";
import InvalidCacheKeyError from "./errors/InvalidCacheKeyError";

export class Key {
    private static readonly KEY_PATTERN = /^[a-z-0-9._\-]+$/i;
    private key: string;

    public constructor(key: string) {
        if (!Key.KEY_PATTERN.test(key)) {
            throw new InvalidCacheKeyError(key);
        }
        this.key = key
    }

    public asString(): string {
        return this.key;
    }
}

export default interface Cache {
    get(key: Key): Optional<any>;
    set(key: Key, value: any): void;
}
