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
  subMenuTrigger = false;
  path;

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

}
