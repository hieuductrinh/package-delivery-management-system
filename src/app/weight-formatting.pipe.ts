import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightFormatting',
  standalone: true
})
export class WeightFormattingPipe implements PipeTransform {

  transform(weight: number): string {
    return (weight * 1000).toString() + "g"
  }

}
