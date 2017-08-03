import { Component, OnInit, OnDestroy  } from '@angular/core';
import {AppState} from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy  {

  constructor(
    private appState: AppState,
    private router: Router
  ) { }

  subscription;

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
