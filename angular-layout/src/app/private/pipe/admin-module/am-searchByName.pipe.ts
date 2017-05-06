import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({name: 'amSearchByName'})
export class amSearchByName implements PipeTransform {
  transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.nama.depan.indexOf(query) > -1);
        }
        return array;
    }
}