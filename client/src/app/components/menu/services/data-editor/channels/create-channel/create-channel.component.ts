import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../../../../../app.service';

@Component({
  selector: 'create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  menuName = "Создание канала";
  icon= "fa-cogs";
  name;
  path;
  mode;
  frequency;

  state;

  constructor(
    private appState: AppState,
    private router: Router,
  ) { }

  ngOnInit() {
    this.state = this.appState.state;

    const index = this.router.url.lastIndexOf('/');
    this.path = `..${this.router.url.slice(0, index)}`;
    this.appState.set('footerButtons', {
      left: {
        text: 'Сохранить',
        func: this.addChannel.bind(this)
      },
      right: {
        text: 'Назад',
        route: this.path
      }
    });
  }

  addChannel() {
    this.appState.storage.push(
      'channels',
      {
        name: this.name,
        mode: this.mode,
        frequency: this.frequency,
        id: +new Date() + ''
      }
    );
    this.router.navigate([this.path])
  }
}
