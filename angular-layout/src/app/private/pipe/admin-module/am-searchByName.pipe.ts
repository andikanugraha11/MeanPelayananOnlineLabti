import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({name: 'amSearchByName'})
export class amSearchByName implements PipeTransform {
  transform(array: any[], query: string): any {
        if (query) {
            let qUpper = query.toUpperCase();
            return _.filter(array, row=>row.nama.depan.indexOf(qUpper) > -1);
        }
        return array;
    }
}