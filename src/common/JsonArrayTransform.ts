import Repository from "../domain/Repository";
import { Transform, TransformCallback } from "stream";

export default class JsonArrayTransform extends Transform {
    private isFirstObject: boolean;

    public constructor() {
        super({ objectMode: true });
        this.isFirstObject = true;
    }

    _transform(repository: Repository, encoding: string, callback: TransformCallback) {
        let prefix = ',';
        if (this.isFirstObject) {
            this.isFirstObject = false;
            prefix = '[';
        }
        this.push(prefix + JSON.stringify(repository.asJson()));
        callback();
    };

    _flush(callback: TransformCallback) {
        this.push(']');
        callback();
    };
}
