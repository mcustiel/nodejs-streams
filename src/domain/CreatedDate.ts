import DateInTheFutureError from "./errors/DateInTheFutureError";
import InvalidDateError from "./errors/InvalidDateError";

export default class CreatedDate {
    private readonly date: Date;

    public constructor(date: Date) {
        if (isNaN(date.getTime())) {
            throw new InvalidDateError(date.toISOString());
        }
        if (date > new Date()) {
            throw new DateInTheFutureError(date);
        }
        this.date = date;
    }

    public asDate(): Date {
        return this.date;
    }

    public static fromString(dateString: string): CreatedDate {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            throw new InvalidDateError(dateString);
        }

        const date = new Date(dateString);
        if (!isValidDate(date)) {
            throw new InvalidDateError(dateString);
        }

        return new CreatedDate(date);
    }
}

function isValidDate(date: any): boolean {
    return date instanceof Date;
}
