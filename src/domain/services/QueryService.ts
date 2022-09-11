import { Readable } from "stream";
import Query from "../Query";
import Repository from "../repositories/Repository";

export default class QueryService {
    public constructor(private readonly repository: Repository) { }

    public searchRepositories(query: Query): Promise<Readable> {
        return this.repository.search(query);
    }
}
