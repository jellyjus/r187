import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../../../../app.service';
import {getChName} from '../../../../../utils/index';

@Component({
  selector: 'directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {

  menuName = "Список направлений";
  icon = "fa-exchange";
  state;
  directions;
  channels;
  getChName;

  constructor(
      private router: Router,
      private appState: AppState
    )
  { }

  ngOnInit() {
    this.getChName  = getChName;
    this.state = this.appState.state;
    this.directions = this.state.directions;
    this.channels = this.state.channels;


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
