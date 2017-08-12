import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppState} from '../../../app.service';
import {Router} from '@angular/router';
import { notifications } from '../../../utils/index';


@Component({
  selector: 'recv-messages',
  templateUrl: './recv-messages.component.html',
  styleUrls: ['./recv-messages.component.css']
})
export class RecvMessagesComponent implements OnInit, OnDestroy {

  menuName = 'Принятые сообщения';
  icon = 'fa-envelope';

  items;
  state;

  constructor(
    private appState: AppState,
    private router: Router
  ) {}

  ngOnInit() {
    this.state = this.appState.state;
    const index = this.router.url.lastIndexOf('/');
    const path = `..${this.router.url.slice(0, index)}`;
    this.items =  this.state.recvMsgs;
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
    notifications.delete(this.state.notifications, 'newMessage')
  }

  ngOnDestroy() {
  }

}
