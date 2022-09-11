import Optional from "../../common/Optional";
import { ServerResponse } from "http";
import Request from "./Request";

export interface ParameterBag {
    get(name: string): Optional<string>;
    has(name: string): boolean;
    asObject(): Record<string, string>;
}

type Handler = (request: Request, response: ServerResponse) => Promise<void>;

export default Handler;
