import CreatedDate from "./domain/CreatedDate";
import ProgrammingLanguage from "./domain/ProgrammingLanguage";
import Query from "./domain/Query";
import QueryBuilder from "./domain/QueryBuilder";
import InputError from "./errors/InputError";
import MissingFiltersError from "./errors/MissingFiltersError";
import Configuration from "./infrastructure/Configuration";
import Request from "./interface/http/Request";

export function ensureValidRequest(query: Query): void {
    if (!query.getCreatedFrom().isPresent() && !query.getProgrammingLanguage().isPresent()) {
        throw new MissingFiltersError();
    }
}

export function getStatusCode(error: Error): number {
    if (error instanceof InputError) {
        return 400;
    }
    return 500;
}

export function requestToQuery(request: Request, config: Configuration): Query {
    const builder = new QueryBuilder(config);

    const page = request.getQueryString().get('page');
    if (page.isPresent()) {
        builder.withPage(Number.parseInt(page.get()));
    }

    const count = request.getQueryString().get('count');
    if (count.isPresent()) {
        builder.withCountPerPage(Number.parseInt(count.get()));
    }

    const date = request.getQueryString().get('createdFrom');
    if (date.isPresent()) {
        builder.withCreatedDate(CreatedDate.fromString(date.get()));
    }

    const lang = request.getQueryString().get('language');
    if (lang.isPresent()) {
        builder.withLanguage(new ProgrammingLanguage(lang.get()));
    }

    return builder.build();
}
