import { Readable } from "stream";
import Repository from "../Repository";
import {default as DomainRepository} from "../../Repository";
import axios from "axios";
import Query from "../../Query";
import {parser} from "stream-json";
import {chain} from "stream-chain";
import {pick} from 'stream-json/filters/Pick';
import {streamValues} from 'stream-json/streamers/StreamValues';
import {streamArray} from  'stream-json/streamers/StreamArray';
import { url } from "inspector";

interface GithubRepositoryData {
    full_name: string;
    description: string;
    html_url: string;
    url: string;
    private: boolean;
    stargazers_count: number;
    forks_count: number;
}

export default class GithubRepository implements Repository {
    private static readonly SEARCH_ENDPOINT: string = "https://api.github.com/search/repositories";


    async search(query: Query): Promise<Readable> {
        const response = await axios.get(
            GithubRepository.SEARCH_ENDPOINT + buildQueryString(query),
            { responseType: 'stream' }
        );

        return chain([
            response.data,
            parser(),
            pick({filter: "items"}),
            streamArray(),
            data => {
                const value = data.value;
                return convertToDomain(value);
            }
        ]);
    }
}

function convertToDomain(value: GithubRepositoryData): DomainRepository {
    return DomainRepository.fromJson({
        name: value.full_name,
        description: value.description,
        apiUrl: value.url,
        htmlUrl: value.html_url,
        stars: value.stargazers_count,
        forks: value.forks_count,
        public: !value.private
    });
}

function buildQueryString(query: Query): string {
    let queryString = "?";
    queryString += `page=${query.getPage().asNumber()}`;
    queryString += `&per_page=${query.getCountPerPage().asNumber()}`;
    queryString += `&sort=stars&order=desc`;

    let filters = addCreatedDateFilter(query, "");
    filters = addProgrammingLanguageFilter(query, filters);

    queryString += filters;

    console.log("Query", queryString);

    return queryString;
}

function addCreatedDateFilter(query: Query, filters: string): string {
    const createdFrom = query.getCreatedFrom();
    if (createdFrom.isPresent()) {
        return filters + getFiltersPrefix(filters) + `created:>${getIsoDateString(createdFrom.get().asDate())}`;
    }
    return filters;
}

function addProgrammingLanguageFilter(query: Query, filters: string): string {
    const language = query.getProgrammingLanguage();
    if (language.isPresent()) {
        return filters + getFiltersPrefix(filters) + `language:${language.get().asString()}`;
    }
    return filters;
}

function getFiltersPrefix(filters: string): string {
    if (filters.length === 0) {
        return "&q=";
    }
    return ";";
}

function prependZero(n: number): string {
    if (n < 10) {
        return `0${n}`;
    }
    return n.toString();
}

function getIsoDateString(date: Date): string {
    return `${date.getUTCFullYear()}-${prependZero(date.getUTCMonth()+1)}-${prependZero(date.getUTCDate())}`;
}
