import Query from "../../../domain/Query";
import { Readable } from "stream";
import Repository from "../Repository";
import Cache, { Key } from "../../../common/Cache";
import { default as DomainRepository } from "../../Repository";

export default class CachedRepositoryDecorator implements Repository {
    public constructor(
        private readonly decoratedRepository: Repository,
        private readonly cacheService: Cache
    ) { }

    public async search(query: Query): Promise<Readable> {
        const key = new Key(buildCacheKey(query));
        const value = this.cacheService.get(key);

        if (value.isPresent()) {
            return this.streamCachedData(value.get());
        }

        // console.log("Answering from github response");
        const repostioriesStream = await this.decoratedRepository.search(query);
        this.cacheStreamedData(key, repostioriesStream);
        return repostioriesStream;
    }

    private async streamCachedData(data: DomainRepository[]): Promise<Readable> {
        // console.log("Answering from cache");

        const response = new Readable({ objectMode: true });
        data.forEach(v => response.push(v));
        response.push(null);
        return response;
    }

    private cacheStreamedData(key: Key, repostioriesStream: Readable): void {
        const repositories: DomainRepository[] = [];
        repostioriesStream.on("data", (repo: DomainRepository) => {
            // console.log("CACHING...")
            repositories.push(repo);
        });
        repostioriesStream.on("end", () => {
            // console.log("Finished caching...")
            this.cacheService.set(key, repositories);
        });

    }
}

function buildCacheKey(query: Query): string {
    let key = `${query.getPage().asNumber()}.${query.getCountPerPage().asNumber()}`;

    const createdFrom = query.getCreatedFrom();
    if (createdFrom.isPresent()) {
        const date = createdFrom.get().asDate();
        key += `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    }

    const language = query.getProgrammingLanguage();
    if (language.isPresent()) {
        key += `.${language.get().asString()}`;
    }
    return key;
}
