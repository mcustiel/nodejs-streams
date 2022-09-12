import { Readable } from "stream";
import Query from "../Query";
import Repository from "../repositories/Repository";

export default class QueryService {
    public constructor(private readonly repository: Repository) { }

    // Right now this is very simple, looks almost unneecessary. But it provides
    // a separation between the presentation and the persistence layers and could 
    // be more complex logic-wise.
    public searchRepositories(query: Query): Promise<Readable> {
        return this.repository.search(query);
    }
}
