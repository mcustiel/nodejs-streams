import { URL } from "url";
import InvalidUrlError from "./errors/InvalidUrlError";

export default class Url {
    private url: URL;

    public constructor(url: string) {
        try {
            this.url = new URL(url);
        } catch (error) {
            throw new InvalidUrlError(url);
        }
    }

    public asString(): string {
        return this.url.toString();
    }
}
