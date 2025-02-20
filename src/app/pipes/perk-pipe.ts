import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'perkNumbers',
  standalone: true
})

export class PerkNumbers implements PipeTransform{
  constructor(private sanitizer: DomSanitizer) {}
  
  transform(value: string): SafeHtml {
    const newString = value.replace(/([\+\-\d]+)/g, '<span class="perk-label-numbers">$1</span>');

    console.log(newString);
    return this.sanitizer.bypassSecurityTrustHtml(newString);
  }
}