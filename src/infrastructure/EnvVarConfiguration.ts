import DefaultConfiguration from "./DefaultConfiguration";
import env from "env-var";

export default class EnvVarConfiguration extends DefaultConfiguration {
    public getDefaultCount(): number {
        try {
            const defaultCount: number = env.get('DEFAULT_COUNT_PER_PAGE').required().asIntPositive();

            return defaultCount;
        } catch (error) {
            console.log("Error accessing DEFAULT_COUNT_PER_PAGE env-var. Using hardcoded default.")
        }
        return super.getDefaultCount();
    }

    public getHostname(): string {
        try {
            const hostname: string = env.get('HOSTNAME').required().asString();

            return hostname;
        } catch (error) {
            console.log("Error accessing HOSTNAME env-var. Using hardcoded default.")
        }
        return super.getHostname();
    }

    public getListenPort(): number {
        try {
            const port: number = env.get('PORT').required().asPortNumber();

            return port;
        } catch (error) {
            console.log("Error accessing PORT env-var. Using hardcoded default.")
        }
        return super.getListenPort();
    }
}
