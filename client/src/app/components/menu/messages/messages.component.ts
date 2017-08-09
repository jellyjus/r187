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
      action: this.sendMessage.bind(this),
      icon: "fa-arrow-up",
      disable: true,
      cssClass: 'menuDisable'
    },
    {
      name: 'Просмотр',
      action: this.showMessage.bind(this),
      icon: "fa-eye",
      disable: true,
      cssClass: 'menuDisable'
    },
    {
      name: 'Редактировать',
      action: this.editMessage.bind(this),
      icon: "fa-pencil",
      disable: true,
      cssClass: 'menuDisable'
    },
    {
      name: 'Добавить',
      action: this.addMessage.bind(this),
      icon: "fa-plus",
      disable: false,
      cssClass: ''
    },
    {
      name: 'Удалить',
      action: this.deleteMessage.bind(this),
      icon: "fa-trash",
      disable: true,
      cssClass: 'menuDisable'
    }
  ];

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    this.path = `..${this.router.url.slice(0, index)}`;
    this.state = this.appState.state;
    this.state.messages ? this.currentMessage = 0 : this.currentMessage = undefined;
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
    this.message = '';
    this.appState.set('footerButtons', {
      left: {
        text: 'Сохранить',
        func: this.saveMessage.bind(this)
      },
      right: {
        text: 'Отменить',
        func: this.changeMode.bind(this)
      }
    });
  }

  showMessage() {
    this.subMenuTrigger = !this.subMenuTrigger;
    this.mode = 'show';
    this.message = this.state.messages[this.currentMessage];
    this.appState.set('footerButtons', {
      left: {
        text: 'Отправить',
        func: this.sendMessage.bind(this)
      },
      right: {
        text: 'Назад',
        func: this.changeMode.bind(this)
      }
    });
  }

  editMessage() {
    this.mode = 'edit';
    this.message = this.state.messages[this.currentMessage];
    this.subMenuTrigger = !this.subMenuTrigger;
    this.appState.set('footerButtons', {
      left: {
        text: 'Сохранить',
        func: this.updateMessage.bind(this)
      },
      right: {
        text: 'Назад',
        func: this.changeMode.bind(this)
      }
    });
  }

  updateMessage() {
    this.appState.storage.update('messages', this.message, this.currentMessage);
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

  saveMessage() {
    this.appState.storage.push('messages', this.message);
    this.mode = null;
    this.state.messages ? this.currentMessage = 0 : this.currentMessage = undefined;
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
    this.appState.storage.delete("messages", this.currentMessage);
    this.triggerSubMenu();
  }

  changeMode() {
    if(this.mode)
      this.mode = null;
    else
      this.mode = "add";
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


  triggerSubMenu() {
    this.subMenuTrigger = !this.subMenuTrigger;
    !this.state.messages || !this.state.messages.length ? this.currentMessage = undefined : null;

    this.menuItems.forEach((item) => {
      if(this.currentMessage === undefined && item.name != 'Добавить') {
        item.disable = true;
        item.cssClass = 'menuDisable'
      } else {
        item.disable = false;
        item.cssClass = '';
      }
    });

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
