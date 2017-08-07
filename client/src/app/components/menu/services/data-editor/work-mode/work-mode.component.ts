import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../../../../app.service';

@Component({
  selector: 'work-mode',
  templateUrl: './work-mode.component.html',
  styleUrls: ['./work-mode.component.css']
})
export class WorkModeComponent implements OnInit {

  menuName = "Режим работы";
  icon = "fa-sliders";
  subscription;
  curIndex;
  items = [
    {
      name: 'Сети ТМО',
      route: null
    },
    {
      name: 'Сети DMO',
      route: '/dmo'
    },
    {
      name: 'Статусные сообщения',
      route: null
    }
  ];

  constructor(
    private router: Router,
    private appState: AppState
  ) { }

  async ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    const path = `..${this.router.url.slice(0, index)}`;
    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        route: null
      },
      right: {
        text: 'Назад',
        route: path
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

  menuClick(i) {
    this.curIndex = i;
    this.items[this.curIndex].route ? this.router.navigate([this.router.url + this.items[this.curIndex].route]) : null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
