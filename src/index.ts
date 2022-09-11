import { ServerResponse } from "http";
import { finished } from "stream";
import JsonArrayTransform from "./common/JsonArrayTransform";
import Factory from "./factory";
import { ensureValidRequest, getStatusCode, requestToQuery } from "./helpers";
import EnvVarConfiguration from "./infrastructure/EnvVarConfiguration";
import Port from "./interface/http/Port";
import Request from "./interface/http/Request";

function main() {
    const config = new EnvVarConfiguration();
    const factory = new Factory(config);

    const server = factory.createServer();
    const service = factory.createQueryService();

    server.listen(new Port(config.getListenPort()), async (request: Request, response: ServerResponse): Promise<void> => {
        try {
            const query = requestToQuery(request, config);
            ensureValidRequest(query);
            const stream = await service.searchRepositories(query);
            response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

            stream
                .pipe(new JsonArrayTransform())
                .pipe(response);
        } catch (e) {
            const error = e as Error;
            console.log(error);
            response.writeHead(getStatusCode(e as Error));
            response.write(error.message);
            response.end();
        }
    });
}

main();
