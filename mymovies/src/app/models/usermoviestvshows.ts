import { MovieTvShow } from './movietvshows';
import { User } from './users';

export class UserMovieTvShow{
    /*
    private long id;
	private int userRating;
	private boolean watchLater; 
	private boolean watchlist; 
	private boolean reviewed;
	private String userReview;
	
	private MovieTvShowDTO movieTvShow; //one to many
    private UserDTO user; //one to many*/
    id:number;
    userRating:number;
    watchLater:boolean;
    watchlist:boolean;
    reviewed:boolean;
    userReview:string;
    movieTvShow?:MovieTvShow;
    user?:User;

    constructor(id:number,userRating:number, watchLater:boolean,watchlist:boolean,reviewed:boolean,
        userReview:string,movieTvShow?:MovieTvShow,user?:User){
            this.id=id;
            this.userRating=userRating;
            this.watchLater=watchLater;
            this.watchlist=watchlist;
            this.reviewed=reviewed;
            this.userReview=userReview;
            this.movieTvShow=movieTvShow;
            this.user=user;
    }
}