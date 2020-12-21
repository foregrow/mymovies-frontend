import { MovieTvShow } from './movietvshows';
import { Person } from './persons';

export class PersonMovieTvShow{
    /*
    private long id;
	private String castName;
	private boolean director;
	private boolean writer;
	private boolean actor;
	private boolean composer;
	
	private ActorRole actorRole;
	
	private MovieTvShowDTO movieTvShow; //one to many
	private PersonDTO person; //one to many
    */
   id:number;
   castName:string;
   director:boolean;
   writer:boolean;
   actor:boolean;
   composer:boolean;
   actorRole:any;
   movieTvShow?:MovieTvShow;
   person?:Person;

   constructor(id:number,castName:string,director:boolean,
    writer:boolean,actor:boolean,composer:boolean,actorRole:any,movieTvShow?:MovieTvShow,
    person?:Person){
        this.id=id;
        this.castName=castName;
        this.director=director;
        this.writer=writer;
        this.actor=actor;
        this.composer=composer;
        this.actorRole=actorRole;
        this.movieTvShow=movieTvShow;
        this.person=person;
   }
}