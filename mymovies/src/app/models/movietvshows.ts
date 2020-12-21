import { Episode } from './episodes';
import { Genre } from './genres';
import { PersonMovieTvShow } from './personmoviestvshows';
import { Photo } from './photos';
import { Season } from './seasons';
import { Trailer } from './trailers';
import { User } from './users';

export class MovieTvShow{
    /*
    private long id;
	private String name;
	private String description;
	private String storyline;
	private int lengthMinutes;
	private Date releaseDate;
	private int releaseYear;
	private MovieTvShowType type; //movie or tv show
	private String country;
	private String language;
	
	private List<TrailerDTO> trailers = new ArrayList<TrailerDTO>(); //many to one
	private List<SeasonDTO> seasons = new ArrayList<SeasonDTO>(); //many to one
	private List<EpisodeDTO> episodes = new ArrayList<EpisodeDTO>(); //many to one
	private List<UserMovieTvShowDTO> users = new ArrayList<UserMovieTvShowDTO>();//many to one
	private List<PersonMovieTvShowDTO> persons = new ArrayList<PersonMovieTvShowDTO>(); //many to one
	private List<GenreDTO> genres = new ArrayList<GenreDTO>(); //many to many
	private List<PhotoDTO> photos = new ArrayList<PhotoDTO>(); //many to one
    */
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

   trailers?:Trailer[] = [];
   seasons?:Season[] = [];
   episodes?:Episode[] = [];
   users?:User[] = [];
   persons?:PersonMovieTvShow[] = [];
   genres?:Genre[] = [];
   photos?:Photo[] = [];
   constructor(id:number,name:string,description:string,storyline:string,lengthMinutes:number,
    releaseDate:any,releaseYear:number,type:any,country:string,language:string,trailers?:Trailer[],
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
        this.trailers=trailers;
        this.seasons=seasons;
        this.episodes=episodes;
        this.users=users;
        this.persons=persons;
        this.genres=genres;
        this.photos=photos;
    }
}