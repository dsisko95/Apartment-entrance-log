import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterId'
})
export class FilterIdPipe implements PipeTransform {

  transform(logs: any, id: any): any {
    if ( id === undefined || id === 'Svi') {
      return logs;
    } else {
      return logs.filter(function(x){
        return x.Client_Identification_number.includes(id);
      })
    }
  }

}
