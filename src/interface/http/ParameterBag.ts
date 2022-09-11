import Optional from "../../common/Optional";

export default interface ParameterBag {
    get(name: string): Optional<string>;
    has(name: string): boolean;
    asObject(): Record<string, string>;
}
