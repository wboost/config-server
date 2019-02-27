import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[disable-text]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style['-webkit-user-select'] = 'none';
    this.el.nativeElement.style['moz-user-select'] = '-moz-none';
    this.el.nativeElement.style['-moz-user-select'] = 'none';
    this.el.nativeElement.style['-o-user-select'] = 'none';
    this.el.nativeElement.style['-khtml-user-select'] = 'none';
    this.el.nativeElement.style['-ms-user-select'] = 'none';
    this.el.nativeElement.style['user-select'] = 'none';
  }
}
