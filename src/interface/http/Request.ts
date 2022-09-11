import { ParameterBag } from "./Handler";

export default interface Request {
    getQueryString(): ParameterBag;
}
