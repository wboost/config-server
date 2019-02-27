import {Component, OnInit} from '@angular/core';

import {Menu} from "../dto/dto.menu";
import {AppMenuService} from "../service/menu.service";

@Component({
  selector: 'layout-menu',
  template: `
    <ul nz-menu [nzMode]="mode?'vertical':'inline'" [nzTheme]="dark?'dark':'light'" class="menu-ul-style">
      <!-- 获取菜单 -->
      <li nz-submenu *ngFor="let menu of menus">
        <span title disable-text><i nz-icon type="{{menu.icon}}"></i>{{menu.name}}</span>
        <ul>
          <div *ngFor="let child of menu.childs">
            <li nz-menu-item routerLink="{{child.router}}" style="font-size: 12px"><i nz-icon
                                                                                      type="{{ child.icon }}"></i>{{ child.name
              }}
            </li>
          </div>
        </ul>
      </li>
      <!-- end -->
    </ul>`,
  styles: [
      `
      .menu-ul-style {
        width: 240px;
        height: 100%;
      }

      li {
        color: #0090C8;
      }
    `
  ]
})
export class LayoutMenuComponent implements OnInit {
  mode = false;
  dark = false;
  menus: Menu[];

  constructor(private appMenuService: AppMenuService) {
  }

  ngOnInit(): void {
    this.menus = this.appMenuService.fetchMenus()
  }

}
