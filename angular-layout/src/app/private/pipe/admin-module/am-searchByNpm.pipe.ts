import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({name: 'amSearchByNpm'})
export class amSearchByNpm implements PipeTransform {
  transform(array: any[], query: string): any {
        if (query) {
            let qUpper = query.toUpperCase();
            return _.filter(array, row=>row.npm.indexOf(qUpper) > -1);
        }
        return array;
    }
}

@Pipe({name: 'amSearchByNpmPengulangan'})
export class amSearchByNpmPengulangan implements PipeTransform {
  transform(array: any[], query: string): any {
        if (query) {
            let qUpper = query.toUpperCase();
            return _.filter(array, row=>row._praktikanId.npm.indexOf(qUpper) > -1);
        }
        return array;
    }
}