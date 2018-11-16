import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOwner'
})
export class FilterOwnerPipe implements PipeTransform {

  transform(logs: any, owner: any): any {
    if ( owner === undefined || owner === 'Svi') {
      return logs;
    } else {
      return logs.filter(function(x){
        return x.OwnerNameSurname.includes(owner);
      })
    }
  }

}
