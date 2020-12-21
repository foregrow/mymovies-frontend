import { Episode } from './episodes';
import { MovieTvShow } from './movietvshows';

export class Season{
    /*
    private long id;
	private int serialNumber;
	private int releaseYear;
	
	private MovieTvShowDTO movieTvShow; //one to many	
	private List<EpisodeDTO> episodes = new ArrayList<EpisodeDTO>(); 
    */
   id:number;
   serialNumber:number;
   releaseYear:number;
   movieTvShow?:MovieTvShow;
   episodes?:Episode[]=[];
   constructor(id:number,serialNumber:number,releaseYear:number,
    movieTvShow?:MovieTvShow,episodes?:Episode[]){
        this.id =id;
        this.serialNumber=serialNumber;
        this.releaseYear=releaseYear;
        this.movieTvShow=movieTvShow;
        this.episodes=episodes;
    }
}