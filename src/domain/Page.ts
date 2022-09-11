import InvalidPageError from "./errors/InvalidPageErrors";


export default class Page {
    private readonly page: number;

    public constructor(page: number) {
        if (page < 1 || !Number.isInteger(page)) {
            throw new InvalidPageError(page);
        }
        this.page = page;
    }

    public asNumber(): number {
        return this.page;
    }
}
