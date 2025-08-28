import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatting',
  standalone: true
})
export class DateFormattingPipe implements PipeTransform {

  transform(date: string): string {
    let createdAt = new Date(date)
    return createdAt.toLocaleString("en-au");
  }

}
