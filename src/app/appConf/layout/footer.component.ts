import { Component } from '@angular/core';

@Component({
  selector: 'layout-footer',
  template: `
    <nz-footer class="disableText">{{ footerText }}</nz-footer>
  `,
  styles  : [
    `
    :host ::ng-deep .ant-layout-footer {
      background: #7dbcea;
      color: #fff;
      padding: 10px;
      text-align: center;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .disableText {
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none;
      -webkit-user-select:none;
      -ms-user-select:none;
      user-select:none;
    }
    `
  ]
})
export class LayoutFooterComponent {
  footerText = 'Design ©2018'
}
