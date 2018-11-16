import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(logs: any, status: any): any {
    if ( status === undefined || status === 'Svi') {
      return logs;
    } else {
      return logs.filter(function(x){
        return x.Status.includes(status);
      })
    }
  }

}
