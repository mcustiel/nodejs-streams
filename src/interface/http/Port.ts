import { InvalidPortError } from "./errors/InvalidPortError";

export default class Port {
    static readonly MAX_PORT: number = 65535;

    private port: number;

    public constructor(port: number) {
        if (port < 0 || port > Port.MAX_PORT) {
            throw new InvalidPortError(port);
        }
        this.port = port;
    }

    public asNumber(): number {
        return this.port;
    }
}
