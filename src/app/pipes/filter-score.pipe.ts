import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterScore'
})
export class FilterScorePipe implements PipeTransform {

  transform(objs:any, term:any): any {
    if (term === undefined) {
      return objs;
    }
    return objs.filter((obj)=> {
      return (obj.score.toString().includes(term.toString()));
    })
  }
}
