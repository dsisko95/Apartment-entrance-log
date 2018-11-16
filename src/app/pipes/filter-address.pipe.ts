import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAddress'
})
export class FilterAddressPipe implements PipeTransform {

  transform(logs: any, address: any): any {
    if (address === undefined || address === 'Sve') {
      return logs;
    } else {
      return logs.filter(function (x) {
        return x.ApartmentAddress.includes(address);
      })

    }

  }
}