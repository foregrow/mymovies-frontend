export class DateUtils{

    private static readonly MIN_MINUTES = 0;
    private static readonly MAX_MINUTES = 60;
    private static readonly PLUS_MONTH = 1;
    private static readonly HOUR_IN_MILLIS = 3600000;
    private static readonly ADDED_HOURS_DIFF = 3;
    public static getFromAndToDates() {
        let today = new Date();
        let year = today.getFullYear();
        let monthNumber = today.getMonth() + DateUtils.PLUS_MONTH;
        let dayNumber = today.getDate();
        let hoursNumber = today.getHours();
        let minutesNumber = today.getMinutes();
        let secNumber = today.getSeconds();

        let month = monthNumber < 10 && monthNumber > 0  ? `0${monthNumber}` : `${monthNumber}`;
        let day = dayNumber<10&&dayNumber>0 ? `0${dayNumber}` : `${dayNumber}`;
        let hours = hoursNumber<10&&hoursNumber>=0 ? `0${hoursNumber}` : `${hoursNumber}`;
        let minutes = minutesNumber<10&&minutesNumber>=0 ? `0${minutesNumber}` : `${minutesNumber}`;
        let sec = secNumber<10&&secNumber>=0 ? `0${secNumber}` : `${secNumber}`;
        
        let from = `${year}-${month}-${day}T${hours}:${minutes}:${sec}Z`;
        //today's date + added hours (from-to date range)
        let todayPlusDiffHours = new Date(today.setHours(today.getHours() + DateUtils.ADDED_HOURS_DIFF)); 
        year = todayPlusDiffHours.getFullYear();
        monthNumber = todayPlusDiffHours.getMonth() + DateUtils.PLUS_MONTH;
        dayNumber = todayPlusDiffHours.getDate();
        hoursNumber = todayPlusDiffHours.getHours();
        minutesNumber = todayPlusDiffHours.getMinutes();
        secNumber = todayPlusDiffHours.getSeconds();
        month = monthNumber < 10 && monthNumber > 0  ? `0${monthNumber}` : `${monthNumber}`;
        day = dayNumber<10&&dayNumber>0 ? `0${dayNumber}` : `${dayNumber}`;
        hours = hoursNumber<10&&hoursNumber>=0 ? `0${hoursNumber}` : `${hoursNumber}`;
        minutes = minutesNumber<10&&minutesNumber>=0 ? `0${minutesNumber}` : `${minutesNumber}`;
        sec = secNumber<10&&secNumber>=0 ? `0${secNumber}` : `${secNumber}`;

        let to = `${year}-${month}-${day}T${hours}:${minutes}:${sec}Z`;
        return { 'from': from, 'to': to };
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