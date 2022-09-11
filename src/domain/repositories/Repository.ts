import { Readable } from "stream";
import Query from "../Query";

// The name here is a bit weird, because this is the repository of repositories
// but I did not want to call it RepositoryRepository, so it should be improved...
export default interface Repository {
    search(query: Query): Promise<Readable>;
}
