export class DateUtils{

    private static readonly MIN_MINUTES = 0;
    private static readonly MAX_MINUTES = 60;
    private static readonly PLUS_MONTH = 1;

    public static getFromAndToDates(){
        let today = new Date();
        let from = `${today.getFullYear()}-${today.getMonth()+DateUtils.PLUS_MONTH}-${today.getDate()}T00:00:00Z`;
        let to = `${today.getFullYear()}-${today.getMonth()+DateUtils.PLUS_MONTH}-${today.getDate()}T23:59:59Z`;
        return {'from':from,'to':to};
    }

    public static isMovieInFuture(movieStartDT:any): Boolean{
        let result = false;
        let movieStartTime = new Date(new Date(movieStartDT).getTime() - 3600000);
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