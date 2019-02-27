import { Component } from '@angular/core';

@Component({
  selector: 'layout-content',
  template: `
    <nz-content class="layout-content"><app-content></app-content></nz-content>
  `,
  styles: [
    `
      .layout-content {
        left: 240px;
        position: absolute;
        top: 64px;
        margin: 10px;
      }
    `
  ]
})
export class LayoutContentComponent {
}
