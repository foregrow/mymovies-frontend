import { PersonsComponent } from '../components/admin/persons/persons.component';
import { MovieTvShow } from './movietvshows';
import { Person } from './persons';
import { User } from './users';

export class Photo{
    /*
    private long id;
	private String name;
	private String path;
	
	private MovieTvShowDTO movieTvShow; //one to many
	private PersonDTO person; //one to many
	private UserDTO user; //one to one
    */
   id:number;
   name:string;
   path:string;
   type:string;
   picByte:any;
   movieTvShow?: MovieTvShow;
   person?: Person;
   user?: User;

   
   constructor(id:number,name:string,path:string,movieTvShow?:MovieTvShow,type?:string,picByte?:any,
    person?:Person,user?:User){
        this.id = id;
        this.name = name;
        this.path=path;
        this.type=type;
        this.picByte=picByte;
        this.movieTvShow=movieTvShow;
        this.person=person;
        this.user = user;
    }

}