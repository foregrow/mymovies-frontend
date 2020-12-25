import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'seasonsFilter'
})
export class SeasonsFilterPipe implements PipeTransform{

    transform(seasons:any[]){
        if(!seasons){
            return seasons;
        }
        return seasons.sort((a, b) => a.serialNumber - b.serialNumber);
    
    }
}