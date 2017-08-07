import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../../../../app.service';

@Component({
  selector: 'directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {

  menuName = "Направления";
  icon = "fa-exchange";
  state;
  directions;

  constructor(
      private router: Router,
      private appState: AppState
    )
  { }

  ngOnInit() {
    this.state = this.appState.state;
    this.directions = this.state.directions;

    const index = this.router.url.lastIndexOf('/');
    const path = `..${this.router.url.slice(0, index)}`;
    this.appState.set('footerButtons', {
      left: {
        text: 'Создать',
        route: '/create-direction'
      },
      right: {
        text: 'Назад',
        route: path
      }
    });
  }

}
