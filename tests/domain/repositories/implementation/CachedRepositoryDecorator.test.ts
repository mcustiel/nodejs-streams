import { describe, expect, it, beforeEach } from '@jest/globals';
import { isA, mock, MockProxy, Matcher, MatcherCreator } from 'jest-mock-extended';
import Repository from "../../../../src/domain/repositories/Repository";
import CachedRepositoryDecorator from "../../../../src/domain/repositories/implementation/CachedRepositoryDecorator";
import Cache, { Key } from '../../../../src/common/Cache';
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

const keyMatcher: MatcherCreator<Key | undefined, Key | undefined> = (expectedValue: Key | undefined) => new Matcher((actualValue: Key | undefined) => {
    return !expectedValue && !actualValue || !!expectedValue && !!actualValue && expectedValue.asString() === actualValue.asString();
}, "Key matcher");

describe("CachedRepositoryDecorator", () => {
    let decoratedRepository: MockProxy<Repository>;
    let cacheService: MockProxy<Cache>;
    let repository: CachedRepositoryDecorator;

    beforeEach(() => {
        decoratedRepository = mock<Repository>();
        cacheService = mock<Cache>();
        repository = new CachedRepositoryDecorator(decoratedRepository, cacheService);
    });

    describe("when value is in cache", () => {
        let stream: Readable;
        beforeEach(async () => {
            cacheService.get.calledWith(keyMatcher(new Key("1.10.php"))).mockReturnValue(new Optional(CACHED_DATA));
            stream = await repository.search(QUERY);
        });

        it("returns a stream providing the cached data", async () => {
            const data = await getStreamData(stream);

            expect(data).toEqual(CACHED_DATA);
        });

        it("does not get data from the decorated repository", () => {
            expect(decoratedRepository.search).not.toHaveBeenCalled();
        });
    });

    describe("when value is not in cache", () => {
        let stream: Readable;

        beforeEach(async () => {
            const responseStream = new Readable({objectMode: true});
            CACHED_DATA.forEach((d) => responseStream.push(d));
            responseStream.push(null);

            cacheService.get.calledWith(keyMatcher(new Key("1.10.php"))).mockReturnValue(Optional.absent());
            decoratedRepository.search.calledWith(isA(Query)).mockReturnValue(responseStream);
            stream = await repository.search(QUERY);
        });

        it("returns a stream providing the cached data", async () => {
            const data = await getStreamData(stream);

            expect(data).toEqual(CACHED_DATA);
        });

        it("does get the data from the decorated repository", () => {
            expect(decoratedRepository.search).toHaveBeenCalledWith(QUERY);
        });
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
