import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../../../../../app.service';

@Component({
  selector: 'create-direction',
  templateUrl: './create-direction.component.html',
  styleUrls: ['./create-direction.component.css']
})
export class CreateDirectionComponent implements OnInit {

  menuName = "Создание направления";
  icon= "fa-cogs";
  state;
  channels;
  name;
  channel;
  path;

  constructor(
    private appState: AppState,
    private router: Router,
  ) { }

  ngOnInit() {
    this.state = this.appState.state;
    this.channels = this.state.channels;

    const index = this.router.url.lastIndexOf('/');
    this.path = `..${this.router.url.slice(0, index)}`;
    this.appState.set('footerButtons', {
      left: {
        text: 'Создать',
        func: this.addDir.bind(this)
      },
      right: {
        text: 'Назад',
        route: this.path
      }
    });
  }

  addDir() {
    this.appState.storage.push(
      'directions',
      {
        name: this.name,
        channelId: this.channel,
      }
    );
    this.router.navigate([this.path])
  }

}
