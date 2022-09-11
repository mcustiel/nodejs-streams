import Cache, { Key } from "../Cache";
import Optional from "../Optional";

// This cache is only an example, it will consume a lot of internal memory.
// redis, memcached or dragonfly should be used for this purpose.
export default class SimpleMemoryCache implements Cache {
    private static cache: { [key: string]: any } = {};

    get(key: Key): Optional<any> {
        const keyString = key.asString();

        if (keyString in SimpleMemoryCache.cache) {
            return new Optional(SimpleMemoryCache.cache[keyString]);
        }
        return Optional.absent();
    }

    set(key: Key, value: any): void {
        SimpleMemoryCache.cache[key.asString()] = value;
        setTimeout(() => { console.log(`Deleting cache key: ${key.asString()}`); delete SimpleMemoryCache.cache[key.asString()] }, 60000);
    }
}
