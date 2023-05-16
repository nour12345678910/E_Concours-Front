import { Pipe, PipeTransform } from '@angular/core';
import { Diplome } from '../models/Diplome';

@Pipe({
  name: 'diplomeFilter'
})
export class DiplomeFilterPipe implements PipeTransform {
  transform(diplomes: Diplome[], diplome: string): Diplome[] {
    if (!diplomes || !diplome) {
      return diplomes;
    }

    return diplomes.filter((d: Diplome) => d.diplome === diplome);
  }
}
