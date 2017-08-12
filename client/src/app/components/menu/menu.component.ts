import { Component, OnInit, OnDestroy  } from '@angular/core';
import {AppState} from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy  {

  state;
  curIndex;
  subscription;
  items = [
    {
      name: 'Шумоподавитель',
      icon: 'fa-cogs',
      route: '/rtc',
    },
    {
      name: 'Навигация',
      icon: 'fa-globe',
      route: null,
    },
    {
      name: 'Принятые сообщения',
      icon: 'fa-envelope',
      route: '/recv-messages',
    },
    {
      name: 'Сообщения',
      icon: 'fa-envelope',
      route: '/messages',
    },
    {
      name: 'Настройки',
      icon: 'fa-cogs',
      route: null,
    },
    {
      name: 'Сервисное меню',
      icon: 'fa-cogs',
      route: '/services',
    },
    {
      name: 'Батарея',
      icon: 'fa-battery-2',
      route: null,
    }
  ];

  constructor(
    private appState: AppState,
    private router: Router
  ){}

  menuClick(i) {
    this.curIndex = i;
    this.items[this.curIndex].route ? this.router.navigate([this.router.url + this.items[this.curIndex].route]) : null;
  }

  ngOnInit() {
    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        route: null
      },
      right: {
        text: 'Назад',
        route: '../'
      }
    });

    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
        case 11:
          this.items[this.curIndex].route ? this.router.navigate([this.items[this.curIndex].route]) : null;
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
