import {Component} from '@angular/core';

@Component({
  selector: 'layout-top',
  template: `
    <nz-header>
      <div disable-text class="logo"><img src="{{ iconImg }}" class="logo-img"/><h4
        style="float: left;display: inline-block;line-height: 31px;color:#fff;">{{title}}</h4></div>
    </nz-header>
  `,
  styles: [
      `.logo {
      /*width: 120px;*/
      height: 31px;
      background: #077CBC;
      margin: 12px 28px 16px 0;
      float: left;
    }

    .logo-img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      float: left;
    }

    .ant-layout-header {
      background: #077CBC;
      color: #fff;
      height: 55px;
    }
    `
  ]
})
export class LayoutTopComponent {
  iconImg = './assets/image/icon5.png';
  title = 'ChinaolyConfigServer';
}
