import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppState} from '../../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private router: Router,
    private appState: AppState
  ) { }

  subscription;
  state;
  subMenuTrigger = false;
  path;
  menuName = 'Сообщения';
  icon = 'fa-envelope';
  mode = null;
  message;
  currentMessage;
  menuItems = [
    {
      name: 'Отправить',
      action: this.sendMessage.bind(this)
    },
    {
      name: 'Добавить',
      action: this.addMessage.bind(this)
    },
    {
      name: 'Удалить',
      action: this.deleteMessage.bind(this)
    }
  ];

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    this.path = `..${this.router.url.slice(0, index)}`;
    this.state = this.appState.state;
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

    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
        case 11:
          break;
      }
    });
  }

  addMessage() {
    this.mode = 'add';
    this.subMenuTrigger = !this.subMenuTrigger;
    this.appState.set('footerButtons', {
      left: {
        text: 'Сохранить',
        func: this.saveMessage.bind(this)
      },
      right: {
        text: 'Стереть',
        route: null
      }
    });
  }

  saveMessage() {
    this.appState.storage.push('messages', this.message);
    this.mode = null;
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

  sendMessage() {
    this.router.navigate(['/start-screen', {message: this.state.messages[this.currentMessage]}])
  }

  deleteMessage() {
    console.log('delete')
  }


  triggerSubMenu() {
    this.subMenuTrigger = !this.subMenuTrigger;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}