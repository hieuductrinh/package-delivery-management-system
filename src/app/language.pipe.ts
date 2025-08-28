import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languagePipe',
  standalone: true
})
export class LanguagePipe implements PipeTransform {

  transform(language: string): string {
    if (language == "fr") {
      return "French"
    }
    else if (language == "de") {
      return "German"
    }
    else if (language == "el") {
      return "Greek"
    }
    else {
      return ""
    }
  }

}
