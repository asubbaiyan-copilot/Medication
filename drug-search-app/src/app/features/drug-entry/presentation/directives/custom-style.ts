import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomStyle]',
})
export class CustomStyle {
  constructor(element: ElementRef) {
    element.nativeElement.style.backgroundColor = 'blue';
    element.nativeElement.style.color = 'yellow';
    element.nativeElement.style.transition = 'background-color 0.5s';
    element.nativeElement.style.fontSize = '24px';
    element.nativeElement.style.fontWeight = 'bold';
    element.nativeElement.style.padding = '10px';
    element.nativeElement.style.borderRadius = '4px';
    element.nativeElement.style.border = '1px solid #ddd';
  }
}
