import Server from "../Server";
import Handler from "../Handler";
import http, { IncomingMessage, ServerResponse } from 'http';
import NodeRequest from "./NodeRequest";
import InvalidHttpRequestError from "../errors/InvalidHttpRequestError";
import Port from "../Port";
import Request from "../Request";

export default class NodeHttpServer implements Server {
    public constructor(private readonly serverName: string) { }

    public listen(port: Port, handlerFunc: Handler): void {
        const requestListener = (request: IncomingMessage, response: ServerResponse): void => {
            if (request.url) {
                handlerFunc(
                    this.nodeIncomingMessageToRequest(request),
                    response
                );
            } else {
                response.writeHead(400, 'No URL Provided');
                response.end();
            }
        };

        const server = http.createServer(requestListener);
        server.listen(port.asNumber());
    }

    private nodeIncomingMessageToRequest(msg: IncomingMessage): Request {
        if (msg.url) {
            const queryObject = new URL(msg.url, this.serverName);
            return new NodeRequest(queryObject.searchParams)
        }
        throw new InvalidHttpRequestError("URL not provided");
    }
}
