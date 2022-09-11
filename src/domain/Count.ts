import InvalidCountError from "./errors/InvalidCountError";
import InvalidPageError from "./errors/InvalidPageErrors";

export default class Count {
    private readonly count: number;

    public constructor(count: number) {
        if (count < 0 || !Number.isInteger(count)) {
            throw new InvalidCountError(count);
        }
        this.count = count;
    }

    public asNumber(): number {
        return this.count;
    }
}
