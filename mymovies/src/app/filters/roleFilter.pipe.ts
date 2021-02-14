import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from 'lodash';

@Pipe({
    name: 'roleFilter'
})
export class RoleFilterPipe implements PipeTransform{

    transform(personmts: any, sortBy: string, order?: string): any[] {
        if(!personmts){
            return personmts;
        }
        const sortOrder = order ? order : 'asc';

        return orderBy(personmts, [sortBy], [sortOrder]);
    
    }
}