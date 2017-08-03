import { Component, OnInit, OnDestroy  } from '@angular/core';
import {AppState} from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy  {

  items;
  state;
  curIndex;
  subscription;

  constructor(
    private appState: AppState,
    private router: Router
  ){
    this.items = [
      {
        name : 'Шумоподавитель',
        icon : 'fa-cogs',
        route : null,
        active : false
      },
      {
        name : 'Навигация',
        icon : 'fa-globe',
        route : null,
        active : false
      },
      {
        name : 'Принятые сообщения',
        icon : 'fa-envelope',
        route : null,
        active : false
      },
      {
        name : 'Настройки',
        icon : 'fa-cogs',
        route : null,
        active : false
      },
      {
        name : 'Сервисное меню',
        icon : 'fa-cogs',
        route : null,
        active : false
      },
      {
        name : 'Батарея',
        icon : 'fa-battery-2',
        route : null,
        active : false
      }
    ];
  }

  menuClick(i) {
    this.curIndex = i;
  }

  ngOnInit() {
    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        route: '/menu'
      },
      right: {
        text: 'Назад',
        route: '/'
      }
    });

    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
