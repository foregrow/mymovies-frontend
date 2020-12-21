import { PersonMovieTvShow } from './personmoviestvshows';
import { Photo } from './photos';

export class Person{
    /*
    private long id;
	private String firstName;
	private String lastName;
	private String bio;
	private Date bornDate;
	private Date diedDate;
	
	private List<PersonMovieTvShowDTO> moviesTvShows = new ArrayList<PersonMovieTvShowDTO>(); //many to one
	private List<PhotoDTO> photos = new ArrayList<PhotoDTO>(); //many to one
    */
    id:number;
    firstName:string;
    lastName:string;
    bio: string;
    bornDate: any;
    diedDate: any;
    moviesTvShows?:PersonMovieTvShow[] = [];
    photos?:Photo[] = [];
   constructor(id:number,firstName:string,lastName:string,bio:string,
    bornDate:any,diedDate:any,moviesTvShows?:PersonMovieTvShow[],photos?:Photo[]){
        this.id = id;
        this.firstName = firstName;
        this.lastName=lastName;
        this.bio=bio;
        this.bornDate=bornDate;
        this.diedDate = diedDate;
        this.moviesTvShows=moviesTvShows;
        this.photos=photos;
    }
}