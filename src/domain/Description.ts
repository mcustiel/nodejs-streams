export default class Description {
    public constructor(private readonly description: string) { }

    public asString(): string {
        return this.description;
    }
}
