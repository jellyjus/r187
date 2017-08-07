import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppState} from '../../../app.service';
import {Router} from '@angular/router';

class Message {
  title;
  time;
  date;
  text;
  curIndex;

  constructor(title, date, text) {
    this.title = title;
    this.time = date.getHours() + ':' + date.getMinutes();
    this.date = date.getFullYear() + ':' + date.getMonth() + ':' + date.getDay();
    this.text = text;
  }
}


@Component({
  selector: 'recv-messages',
  templateUrl: './recv-messages.component.html',
  styleUrls: ['./recv-messages.component.css']
})
export class RecvMessagesComponent implements OnInit, OnDestroy {

  menuName = 'Принятые сообщения';
  icon = 'fa-envelope';

  items;

  constructor(private appState: AppState, private router: Router) {
    this.items = [
      new Message('Новое сообщение', new Date(), 'Привет'),
      new Message('ннн', new Date(), 'Пока'),
      new Message('общ', new Date(), 'Прощай')
    ]
  }

  ngOnInit() {
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
  }

  ngOnDestroy() {

  }

}
