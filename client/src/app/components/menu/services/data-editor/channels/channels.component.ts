import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../../../../app.service';

@Component({
  selector: 'channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  state;
  channels;

  constructor(
      private router: Router,
      private appState: AppState
    )
    { }

  ngOnInit() {
    this.state = this.appState.state;
    this.channels = this.state.channels;

    const index = this.router.url.lastIndexOf('/');
    const path = `..${this.router.url.slice(0, index)}`;
    this.appState.set('footerButtons', {
      left: {
        text: 'Создать',
        route: '/create'
      },
      right: {
        text: 'Назад',
        route: path
      }
    });
  }

}
