import { Component, OnInit, OnDestroy } from '@angular/core';

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

  items;

  constructor() {
    this.items = [
      new Message('Новое сообщение', new Date(), 'Привет'),
      new Message('ннн', new Date(), 'Пока'),
      new Message('общ', new Date(), 'Прощай')
    ]
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
