import Optional from "../../../common/Optional";
import { ParameterBag } from "../Handler";

export default class NodeParameterBag implements ParameterBag {
    public constructor(private readonly params: URLSearchParams) { }

    public asObject(): Record<string, string> {
        const ret: Record<string, string> = {};
        this.params.forEach((v: string, k: string) => ret[k] = v)
        return ret;
    }

    public get(name: string): Optional<string> {
        return new Optional<string>(this.params.get(name));
    }

    public has(name: string): boolean {
        return this.params.has(name);
    }
}
