#SPA using Angular & Typescript
Frontend of mymovies app which uses external apis:
  1. YoutubeAPI for checking whether the video exists on youtube
  2. External API for getting channels' movies provided by SBB (https://epg.sbb.rs/)
  3. RapidAPI's Google TranslateAPI and imdbAPI for translating title of the movies&tvshows and getting it from imdb's database.


Application consists of user and admin page. Admin page is mostly for crud operations developed in spring, java. (https://github.com/foregrow/mymovies-rest-api)

To make application work:
environmentKeys.rapidapiKeyGT & environmentKeys.rapidapiKeyIMDB in token-interceptor should be under environments/apikeys.ts folder in environmentKeys constant
(they can be got by subscribing at rapid api - google translate & imdb apis)
