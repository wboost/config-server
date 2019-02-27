import { Component } from '@angular/core';

@Component({
  selector: 'layout-top',
  template: `
      <nz-header>
        <div class="logo disableText"><img src="{{ iconImg }}" class="logo-img"/><h4 style="float: left;display: inline-block;line-height: 31px">ConfigServer</h4></div>
      </nz-header>
  `,
  styles  : [
    `.logo {
      width: 120px;
      height: 31px;
      background: #397cbf;
      margin: 16px 28px 16px 0;
      float: left;
    }
    .logo-img {
      width:auto;
      height:auto;
      max-width:100%;
      max-height:100%;
      float: left;
    }
    :host ::ng-deep .ant-layout-header {
      background: #397cbf;
      color: #fff;
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
export class LayoutTopComponent {
  iconImg = './assets/image/icon5.png'
}
