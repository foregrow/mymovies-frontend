export class DateUtils{

    private static readonly MIN_MINUTES = 0;
    private static readonly MAX_MINUTES = 60;
    private static readonly PLUS_MONTH = 1;
    private static readonly HOUR_IN_MILLIS = 3600000;
    public static getFromAndToDates(){
        let today = new Date();
        let month = `${today.getMonth()+DateUtils.PLUS_MONTH}`;
        let day = `${today.getDate()}`;
        if(+month<10&&+month>0){
            month = `0${month}`;
        }
        if(+day<10&&+day>0){
            day = `0${day}`;
        }
        let from = `${today.getFullYear()}-${month}-${day}T00:00:00Z`;
        let to = `${today.getFullYear()}-${month}-${day}T23:59:59Z`;
        return {'from':from,'to':to};
    }

    public static isMovieInFuture(movieStartDT:any): Boolean{
        let result = false;
        let movieStartTime = new Date(new Date(movieStartDT).getTime() - DateUtils.HOUR_IN_MILLIS);
        let now = new Date();
        
        let inFuture = movieStartTime>now;
        if(inFuture){
            let diff =Math.round((movieStartTime.getTime()-now.getTime())/60000);
            if(diff>DateUtils.MIN_MINUTES&&diff<=DateUtils.MAX_MINUTES){
                result = true;
                return result;
            }
        }
        return result;
    }
}