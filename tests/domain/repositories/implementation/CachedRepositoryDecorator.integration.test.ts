import { describe, expect, it, beforeEach } from '@jest/globals';
import { isA, mock, MockProxy, Matcher, MatcherCreator } from 'jest-mock-extended';
import Repository from "../../../../src/domain/repositories/Repository";
import CachedRepositoryDecorator from "../../../../src/domain/repositories/implementation/CachedRepositoryDecorator";
import Cache, { Key } from '../../../../src/common/Cache';
import SimpleMemoryCache from '../../../../src/common/implementation/SimpleMemoryCache';
import { default as DomainRepository } from "../../../../src/domain/Repository";
import Optional from '../../../../src/common/Optional';
import Query from '../../../../src/domain/Query';
import Page from '../../../../src/domain/Page';
import CountPerPage from '../../../../src/domain/CountPerPage';
import ProgrammingLanguage from '../../../../src/domain/ProgrammingLanguage';
import { Readable } from 'stream';

const CACHED_DATA = [
    DomainRepository.fromJson({
        name: "mcustiel/phiremock",
        description: "Http mocker and stubber for php",
        apiUrl: "http://phiremock.api.url",
        htmlUrl: "http://phiremock.html.url",
        stars: 42,
        forks: 10,
        public: true
    }),
];

const QUERY = new Query(new Page(1), new CountPerPage(10), undefined, new ProgrammingLanguage('php'));

describe("CachedRepositoryDecorator", () => {
    let decoratedRepository: MockProxy<Repository>;
    let cacheService: Cache;
    let repository: CachedRepositoryDecorator;
    let stream: Readable;

    beforeEach(() => {
        decoratedRepository = mock<Repository>();
        cacheService = new SimpleMemoryCache();
        repository = new CachedRepositoryDecorator(decoratedRepository, cacheService);
    });


    beforeEach(async () => {
        const responseStream = new Readable({ objectMode: true });
        CACHED_DATA.forEach((d) => responseStream.push(d));
        responseStream.push(null);

        decoratedRepository.search.calledWith(isA(Query)).mockReturnValue(responseStream);
        stream = await repository.search(QUERY);
    });

    it("returns cached data the next time it's called", async () => {
        const data = await getStreamData(stream);
        stream = await repository.search(QUERY);
        expect(decoratedRepository.search).toHaveBeenCalledTimes(1);

        expect(data).toEqual(CACHED_DATA);
    });

});

async function getStreamData(stream: Readable): Promise<DomainRepository[]> {
    const repos: DomainRepository[] = [];

    return new Promise((resolve, reject) => {
        stream.on("data", (data) => {
            repos.push(data);
        });
        stream.on("end", () => {
            resolve(repos);
        });
        stream.on("error", (e) => {
            reject(e);
        });
    });
}
