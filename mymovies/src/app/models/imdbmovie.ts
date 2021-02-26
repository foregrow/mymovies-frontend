export class ImdbMovie{
    id:string;
    lengthInMinutes:number;
    title:String;
    type:any;
    year:number;
    constructor(lengthInMinutes:number,title:String,type:any,year:number){
        this.lengthInMinutes=lengthInMinutes;
        this.title=title;
        this.type=type;
        this.year=year;
    }

}