import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppState} from '../../../app.service';
import {Router} from '@angular/router';
import { notifications } from '../../../utils/index';
import {falseIfMissing} from "protractor/built/util";


@Component({
  selector: 'recv-messages',
  templateUrl: './recv-messages.component.html',
  styleUrls: ['./recv-messages.component.css']
})
export class RecvMessagesComponent implements OnInit, OnDestroy {

  menuName = 'Принятые сообщения';
  icon = 'fa-envelope';
  state;
  message;
  path;
  flag = false;
  mode = null;
  currentMessage;
  subMenuTrigger = false;
  menuItems = [
    {
      name: 'Просмотр',
      action: this.showMessage.bind(this),
      icon: "fa-eye"
    },
    {
      name: 'Удалить',
      action: this.deleteMessageOnMenu.bind(this),
      icon: "fa-trash"
    }
  ];

  constructor(
    private appState: AppState,
    private router: Router
  ) {}

  ngOnInit() {
    this.state = this.appState.state;
    const index = this.router.url.lastIndexOf('/');
    this.state.recvMsgs ? this.currentMessage = 0 : this.currentMessage = undefined;
    this.path = `..${this.router.url.slice(0, index)}`;
    this.appState.set('footerButtons', {
      left: {
        text: 'Меню',
        func: this.triggerSubMenu.bind(this)
      },
      right: {
        text: 'Назад',
        route: this.path
      }
    });
  }

  ngOnDestroy() {
  }

  showMessage() {
    this.subMenuTrigger = !this.subMenuTrigger;
    this.mode = 'show';
    this.message = this.state.recvMsgs[this.currentMessage];
    this.message.isRead = true;
    this.appState.storage.update("recvMsgs", this.message, this.currentMessage);
    this.flag = this.state.recvMsgs.every((item) => {
      return item.isRead;
    });
    if(this.flag) notifications.delete(this.state.notifications, 'newMessage');
    this.appState.set('footerButtons', {
      left: {
        text: 'Удалить',
        func: this.deleteMessage.bind(this)
      },
      right: {
        text: 'Назад',
        func: this.changeMode.bind(this),
      }
    });
  }

  deleteMessage() {
    this.appState.storage.delete("recvMsgs", this.currentMessage);
    this.changeMode();
  }

  deleteMessageOnMenu() {
    this.appState.storage.delete("recvMsgs", this.currentMessage);
    console.log(this.state.recvMsgs.length);
    if (!this.state.recvMsgs.length) notifications.delete(this.state.notifications, 'newMessage');
    this.triggerSubMenu();
  }

  changeMode() {
    if(this.mode)
      this.mode = null;
    else
      this.mode = "show";
    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        func: this.triggerSubMenu.bind(this)
      },
      right: {
        text: 'Назад',
        route: this.path
      }
    });
  }

  triggerSubMenu() {
    this.subMenuTrigger = !this.subMenuTrigger;
    !this.state.recvMsgs || !this.state.recvMsgs.length ? this.currentMessage = undefined : null;

    if (this.subMenuTrigger) {
      this.appState.set('footerButtons', {
        left: {
          text: 'Выбрать'
        },
        right: {
          text: 'Назад',
          func: this.triggerSubMenu.bind(this)
        }
      });
    }
    else {
      this.appState.set('footerButtons', {
        left: {
          text: 'Меню',
          func: this.triggerSubMenu.bind(this)
        },
        right: {
          text: 'Назад',
          route: this.path
        }
      });
    }
  }

}
