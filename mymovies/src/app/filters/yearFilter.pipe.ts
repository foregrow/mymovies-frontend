import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from 'lodash';

@Pipe({
    name: 'yearFilter'
})
export class YearFilterPipe implements PipeTransform{

    transform(moviestvshows: any, sortBy: string, order?: string): any[] {
        if(!moviestvshows){
            return moviestvshows;
        }
        const sortOrder = order ? order : 'desc';

        return orderBy(moviestvshows, [sortBy], [sortOrder]);
    
    }
}