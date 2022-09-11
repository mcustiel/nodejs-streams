import Cache from "./common/Cache";
import SimpleMemoryCache from "./common/implementation/SimpleMemoryCache";
import CachedRepositoryDecorator from "./domain/repositories/implementation/CachedRepositoryDecorator";
import GithubRepository from "./domain/repositories/implementation/GithubRepository";
import Repository from "./domain/repositories/Repository";
import QueryService from "./domain/services/QueryService";
import ObjectNotCachedError from "./errors/ObjectNotCachedError";
import Configuration from "./infrastructure/Configuration";
import NodeHttpServer from "./interface/http/implementation/NodeHttpServer";
import Server from "./interface/http/Server";

class FactoryCache {
    private cache: Record<string, object>;

    public constructor() {
        this.cache = {};
    }

    public has(key: string): boolean {
        return key in this.cache;
    }

    public get<T extends object>(key: string): T {
        if (!this.has(key)) {
            throw new ObjectNotCachedError(key);
        }
        return this.cache[key] as T;
    }

    public set(key: string, value: object): void {
        this.cache[key] = value;
    }
}

export default class Factory {
    private cache: FactoryCache;

    public constructor(private readonly configuration: Configuration) {
        this.cache = new FactoryCache();
    }

    public createServer(): Server {
        if (!this.cache.has('server')) {
            this.cache.set('server', new NodeHttpServer(this.configuration.getHostname()));
        }
        return this.cache.get<Server>('server');
    }

    public createQueryService(): QueryService {
        if (!this.cache.has('queryService')) {
            this.cache.set('queryService', new QueryService(this.createRepository()));
        }
        return this.cache.get<QueryService>('queryService');
    }

    public createRepository(): Repository {
        if (!this.cache.has('repository')) {
            this.cache.set('repository', new CachedRepositoryDecorator(new GithubRepository(), this.createCacheService()));
        }
        return this.cache.get<Repository>('repository');
    }

    public createCacheService(): Cache {
        if (!this.cache.has('cacheService')) {
            this.cache.set('cacheService', new SimpleMemoryCache());
        }
        return this.cache.get<Cache>('cacheService');
    }
}
