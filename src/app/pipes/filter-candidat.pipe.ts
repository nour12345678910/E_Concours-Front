import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCandidat'
})
export class FilterCandidatPipe implements PipeTransform {

  transform(objs:any, term:any): any {
    if (term === undefined) {
      return objs;
    }
    return objs.filter((obj)=> {
      return (obj.nom.toLowerCase().includes(term.toLowerCase())||obj.prenom.toLowerCase().includes(term.toLowerCase()));
    })
  }

}
