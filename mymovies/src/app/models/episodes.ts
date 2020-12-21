import { MovieTvShow } from './movietvshows';
import { Season } from './seasons';

export class Episode{
    /*
    private long id;
	private int serialNumber;
	private String name;
	
	private MovieTvShowDTO movieTvShow; //one to many
    private SeasonDTO season; //one to many*/
    id:number;
    serialNumber:number;
    name:string;

    movieTvShow?:MovieTvShow;
    season?:Season;

    constructor(id:number,serialNumber:number,name:string,moviesTvShow?:MovieTvShow,season?:Season){
        this.id=id;
        this.serialNumber=serialNumber;
        this.name=name;
        this.movieTvShow=moviesTvShow;
        this.season=season;
    }
}