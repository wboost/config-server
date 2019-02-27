import { Component } from '@angular/core';

@Component({
  selector: 'layout-footer',
  template: `
    <nz-footer disable-text>{{ footerText }}</nz-footer>
  `,
  styles  : [
    `
    :host ::ng-deep .ant-layout-footer {
      background: #7dbcea;
      color: #fff;
      padding: 5px;
      text-align: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-shadow: 10px 10px 5px #888888;
    }
    `
  ]
})
export class LayoutFooterComponent {
  footerText = 'Design ©2018'
}
