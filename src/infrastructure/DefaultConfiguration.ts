import Configuration from "./Configuration";

export default class DefaultConfiguration implements Configuration {
    public getDefaultCount(): number {
        return 10;
    }

    public getHostname(): string {
        return "http://localhost";
    }

    public getListenPort(): number {
        return 8080;
    }
}
