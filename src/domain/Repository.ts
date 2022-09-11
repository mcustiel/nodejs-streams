import Count from "./Count";
import Description from "./Description";
import RepositoryName from "./RepositoryName";
import Url from "./Url";

interface JsonFormat {
    name: string;
    description: string;
    apiUrl: string;
    htmlUrl: string;
    stars: number;
    forks: number;
    public: boolean;
}

export default class Repository {
    public constructor(
        private readonly name: RepositoryName,
        private readonly description: Description,
        private readonly apiUrl: Url,
        private readonly htmlUrl: Url,
        private readonly stars: Count,
        private readonly forks: Count,
        private readonly publicRepo: boolean
    ) { }

    public getName(): RepositoryName {
        return this.name;
    }

    public getDescription(): Description {
        return this.description;
    }

    public getApiUrl(): Url {
        return this.apiUrl;
    }

    public getHtmlUrl(): Url {
        return this.htmlUrl;
    }

    public getStars(): Count {
        return this.stars;
    }

    public getForks(): Count {
        return this.forks;
    }

    public isPublic(): boolean {
        return this.publicRepo;
    }

    public asJson(): JsonFormat {
        return {
            name: this.name.asString(),
            description: this.description.asString(),
            apiUrl: this.apiUrl.asString(),
            htmlUrl: this.htmlUrl.asString(),
            stars: this.stars.asNumber(),
            forks: this.forks.asNumber(),
            public: this.publicRepo
        };
    }

    public static fromJson(data: JsonFormat): Repository {
        return new Repository(
            new RepositoryName(data.name),
            new Description(data.description),
            new Url(data.apiUrl),
            new Url(data.htmlUrl),
            new Count(data.stars),
            new Count(data.forks),
            !data.public
        );
    }
}
