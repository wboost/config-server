import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[sec-header]'
})
export class SecHeaderDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style['position'] = 'fixed';
    this.el.nativeElement.style['overflow'] = 'auto';
    this.el.nativeElement.style['top'] = '55px';
    this.el.nativeElement.style['right'] = '0px';
    this.el.nativeElement.style['left'] = '240px';
    this.el.nativeElement.style['height'] = '30px';
    this.el.nativeElement.style['margin'] = '10px';
  }
}
