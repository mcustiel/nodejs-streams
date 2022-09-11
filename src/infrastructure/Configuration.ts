
export default interface Configuration {
    getHostname(): string;

    getListenPort(): number;

    getDefaultCount(): number;
}
