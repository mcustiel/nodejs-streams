import CountPerPage from "./CountPerPage";
import CreatedDate from "./CreatedDate";
import Page from "./Page";
import ProgrammingLanguage from "./ProgrammingLanguage";
import Query from "./Query";

import Configuration from "../infrastructure/Configuration";

export default class QueryBuilder {
    private static readonly DEFAULT_PAGE = 1;

    private page?: number;
    private count?: number;
    private createDateFrom?: CreatedDate;
    private language?: ProgrammingLanguage;

    public constructor(private readonly configuration: Configuration) { }

    public withPage(page: number): this {
        this.page = page
        return this;
    }

    public withCountPerPage(count: number): this {
        this.count = count;
        return this;
    }

    public withCreatedDate(date: CreatedDate): this {
        this.createDateFrom = date;
        return this;
    }

    public withLanguage(language: ProgrammingLanguage): this {
        this.language = language;
        return this;
    }

    public build(): Query {
        return new Query(
            new Page(this.page ?? QueryBuilder.DEFAULT_PAGE),
            new CountPerPage(this.count ?? this.configuration.getDefaultCount()),
            this.createDateFrom,
            this.language
        );
    }
}
