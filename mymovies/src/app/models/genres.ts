import { MovieTvShow } from './movietvshows';

export class Genre{
    /*
    private long id;
	private GenreType type;
	
    private List<MovieTvShowDTO> moviesTvShows = new ArrayList<MovieTvShowDTO>()*/
    id:number;
    type:any;
    moviesTvShows?:MovieTvShow[]=[];

    constructor(id:number,type:any,moviesTvShows?:MovieTvShow[]){
        this.id=id;
        this.type=type;
        this.moviesTvShows=moviesTvShows;
    }
}