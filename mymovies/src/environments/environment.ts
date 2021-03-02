// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adminRole: "ADMIN",
  userRole: "USER",
  backendApiURL: 'http://localhost:8080',
  //imdbApiURL: 'https://imdb8.p.rapidapi.com/auto-complete',
  imdbApiURL: 'https://imdb8.p.rapidapi.com/title/find', 
  translateApiURL: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  youtubeVideosApiURL: 'https://www.googleapis.com/youtube/v3/videos',
  externalApiBaseURL: 'https://api-web.ug-be.cdn.united.cloud',
  externalTokenURL: '/oauth/token',
  authHeadersValue: "Basic MjdlMTFmNWUtODhlMi00OGU0LWJkNDItOGUxNWFiYmM2NmY1OjEyejJzMXJ3bXdhZmsxMGNkdzl0cjloOWFjYjZwdjJoZDhscXZ0aGc=",
  channelsUrl: '/v1/public/channels', 
  channelsMoviesUrl: '/v1/public/events/epg',

  authenticateURL: 'authenticate',
  api: 'api',
  genres: 'genres',
  episodes: 'episodes',
  users: 'users',
  mts: 'mts',
  persons: 'persons',
  personmts: 'personmts',
  seasons: 'seasons',
  usermts: 'usermts',
  photos: 'photos',
  trailers: 'trailers',

  movieCategory: 201,

  rapidapiKeyGT: '9d86909905mshc867a3f9386b5a1p115fa8jsnb1c3510dfb91',
  rapidapiKeyIMDB: 'bfe6822b6amsh13225f9a212e874p117312jsn3b6c295cc365'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
