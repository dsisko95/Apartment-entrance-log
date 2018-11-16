import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterType'
})
export class FilterTypePipe implements PipeTransform {

  transform(logs: any, type: any): any {
    if ( type === undefined || type === 'Svi') {
      return logs;
    } else {
      return logs.filter(function(x){
        return x.ApartmentType.includes(type);
      })
    }
  }

}
