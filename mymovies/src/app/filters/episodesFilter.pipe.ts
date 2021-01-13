import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'episodesFilter'
})
export class EpisodesFilterPipe implements PipeTransform{

    transform(episodes:any[]){
        if(!episodes){
            return episodes;
        }
        return episodes.sort((a, b) => a.serialNumber - b.serialNumber);
    
    }
}