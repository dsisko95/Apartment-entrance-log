import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClientName'
})
export class FilterClientNamePipe implements PipeTransform {

  transform(logs: any, client: any): any {
    if ( client === undefined || client === 'Svi') {
      return logs;
    } else {
      return logs.filter(function(x){
        return x.ClientNameSurname.includes(client);
      })
    }
  }

}
