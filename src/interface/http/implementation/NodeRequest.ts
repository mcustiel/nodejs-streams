import { ParameterBag } from "../Handler";
import Request from "../Request";
import NodeParameterBag from "./NodeParameterBag";

export default class NodeRequest implements Request {
    private queryString: ParameterBag;

    public constructor(private readonly params: URLSearchParams) {
        this.queryString = new NodeParameterBag(params);
    }

    public getQueryString(): ParameterBag {
        return this.queryString;
    }
}
