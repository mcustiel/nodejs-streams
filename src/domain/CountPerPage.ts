import InvalidCountPerPageError from "./errors/InvalidCountPerPageError";

export default class CountPerPage {
    private static readonly OPTIONS: number[] = [10, 50, 100];
    private readonly count: number;

    public constructor(count: number) {
        if (!Number.isInteger(count) || !CountPerPage.OPTIONS.includes(count)) {
            throw new InvalidCountPerPageError(count);
        }
        this.count = count;
    }

    public asNumber(): number {
        return this.count;
    }
}
