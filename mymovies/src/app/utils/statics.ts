export class Statics{
    public static readonly adminRole: string = "ADMIN";
    public static readonly userRole: string = "USER";

    public static readonly publicAPIBaseURL = "https://api-web.ug-be.cdn.united.cloud";
    public static readonly externalTokenURL = "https://api-web.ug-be.cdn.united.cloud/oauth/token?grant_type=client_credentials";
    public static readonly authHeadersValue = "Basic MjdlMTFmNWUtODhlMi00OGU0LWJkNDItOGUxNWFiYmM2NmY1OjEyejJzMXJ3bXdhZmsxMGNkdzl0cjloOWFjYjZwdjJoZDhscXZ0aGc=";
    public static readonly channelsUrl = "https://api-web.ug-be.cdn.united.cloud/v1/public/channels?channelType=TV&communityId=1&languageId=404";
    public static readonly channelsMoviesUrl = "https://api-web.ug-be.cdn.united.cloud/v1/public/events/epg?";

    public static readonly serverBaseURL = "http://localhost:8080";
    public static readonly authenticateURL: string = "authenticate";
    public static readonly api: string = "api";
    public static readonly genres: string = "genres";
    public static readonly episodes: string = "episodes";
    public static readonly users: string = "users";
    public static readonly mts: string = "mts";
    public static readonly persons: string = "persons";
    public static readonly personmts: string = "personmts";
    public static readonly seasons: string = "seasons";
    public static readonly usermts: string = "usermts";
    public static readonly photos: string = "photos";
    public static readonly trailers: string = "trailers";
    
    public static readonly movieCategory: Number = 201;
}