import { Episode } from './episodes';
import { Genre } from './genres';
import { PersonMovieTvShow } from './personmoviestvshows';
import { Photo } from './photos';
import { Season } from './seasons';
import { Trailer } from './trailers';
import { User } from './users';

export class MovieTvShow{

   id:number;
   name:string;
   description:string;
   storyline: string;
   lengthMinutes: number;
   releaseDate: any;
   releaseYear: number;
   type: any;
   country: string;
   language: string;
   avgRating: number;

   trailers?:Trailer[] = [];
   seasons?:Season[] = [];
   episodes?:Episode[] = [];
   users?:User[] = [];
   persons?:PersonMovieTvShow[] = [];
   genres?:Genre[] = [];
   photos?:Photo[] = [];
   constructor(id:number,name:string,description:string,storyline:string,lengthMinutes:number,
    releaseDate:any,releaseYear:number,type:any,country:string,language:string,avgRating: number,trailers?:Trailer[],
    seasons?:Season[],episodes?:Episode[],users?:User[],persons?:PersonMovieTvShow[],genres?:Genre[],photos?:Photo[]){
        this.id = id;
        this.name = name;
        this.description=description;
        this.storyline=storyline;
        this.lengthMinutes=lengthMinutes;
        this.releaseDate = releaseDate;
        this.releaseYear = releaseYear;
        this.type = type;
        this.country = country;
        this.language = language;
        this.avgRating = avgRating;
        this.trailers=trailers;
        this.seasons=seasons;
        this.episodes=episodes;
        this.users=users;
        this.persons=persons;
        this.genres=genres;
        this.photos=photos;
    }
}