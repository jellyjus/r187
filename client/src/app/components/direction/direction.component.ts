import { Component, OnInit } from '@angular/core';
import {AppState} from '../../app.service'
import {Router} from '@angular/router';

@Component({
  selector: 'direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {

  constructor(
    private appState: AppState,
    private router: Router
  ) { }

  subscription;

  ngOnInit() {
    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        route: '/direction'
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

}
