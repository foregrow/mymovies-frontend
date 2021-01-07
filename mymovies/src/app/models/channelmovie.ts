export class ChannelMovie{
    //'id','title','startTime','endTime','channelId'
    position:number;
    id:number;
    title:string;
    startTime:any;
    endTime:any;
    channelName:string;

    constructor(position:number,id:number,title:string,startTime:any,endTime:any,channelName:string){
        this.position=position;
        this.id=id;
        this.title=title;
        this.startTime=startTime;
        this.endTime=endTime;
        this.channelName=channelName;
    }
}