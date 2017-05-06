import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({name: 'amSearchByNpm'})
export class amSearchByNpm implements PipeTransform {
  transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.npm.indexOf(query) > -1);
        }
        return array;
    }
}