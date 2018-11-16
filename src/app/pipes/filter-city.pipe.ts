import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCity'
})
export class FilterCityPipe implements PipeTransform {

  transform(logs: any, city: any): any {
    if ( city === undefined || city === 'Svi') {
      return logs;
    } else {
      return logs.filter(function(x){
        return x.CityName.includes(city);
      })
    }
  }

}
