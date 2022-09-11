import Optional from "../common/Optional";
import CountPerPage from "./CountPerPage";
import CreatedDate from "./CreatedDate";
import Page from "./Page";
import ProgrammingLanguage from "./ProgrammingLanguage";

export default class Query {
    private readonly createdFrom: Optional<CreatedDate>;
    private readonly language: Optional<ProgrammingLanguage>;

    public constructor(
        private readonly page: Page,
        private readonly count: CountPerPage,
        createdFrom?: CreatedDate,
        language?: ProgrammingLanguage
    ) {
        this.createdFrom = new Optional(createdFrom);
        this.language = new Optional(language);
    }

    public getPage(): Page {
        return this.page;
    }

    public getCountPerPage(): CountPerPage {
        return this.count;
    }

    public getCreatedFrom(): Optional<CreatedDate> {
        return this.createdFrom;
    }

    public getProgrammingLanguage(): Optional<ProgrammingLanguage> {
        return this.language;
    }
}
