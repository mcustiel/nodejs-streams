import Handler from "./Handler";
import Port from "./Port";

export default interface Server {
    listen(port: Port, handlerFunc: Handler): void;
};
