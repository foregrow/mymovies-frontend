import { MovieTvShow } from './movietvshows';

export class Trailer{
    /*
    private long id;
	private String name;
	private String path;
	
    private MovieTvShowDTO movieTvShow; //one to many*/
    id:number;
    name:string;
    path:string;
    movieTvShow?:MovieTvShow

    constructor(id:number,name:string,path:string,movieTvShow?:MovieTvShow){
        this.id=id;
        this.name=name;
        this.path=path;
        this.movieTvShow=movieTvShow;
    }
}