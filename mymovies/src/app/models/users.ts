import { Photo } from './photos';
import { UserMovieTvShow } from './usermoviestvshows';

export class User{
    /*
    private long id;
	private String email;
	private String password;
	private UserRole userRole;
	
	@OneToOne(mappedBy = "user")
	private Photo photo; //one to one
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Set<UserMovieTvShow> moviesTvShows = new HashSet<UserMovieTvShow>(); //many to one*/
    id: number;
    email: string;
    password: string;
    userRole: any;
    photo?: Photo;
    moviesTvShows?:UserMovieTvShow[] = [];
    constructor(id:number,email:string,password:string,userRole:any,photo?:Photo,
        moviesTvShows?:UserMovieTvShow[]){
        this.id = id;
        this.email=email;
        this.password=password;
        this.userRole=userRole;
        this.photo=photo;
        this.moviesTvShows=moviesTvShows;
    }
}