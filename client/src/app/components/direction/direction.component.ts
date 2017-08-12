import { Component, OnInit } from '@angular/core';
import {AppState} from '../../app.service'
import {SocketService} from '../../services/socket.service'
import {Router} from '@angular/router';

@Component({
  selector: 'direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {

  menuName = "Выбор направления";
  directions;
  channels;
  state;
  socket;

  constructor(
    private appState: AppState,
    private router: Router,
    private socketService: SocketService
  ) { }

  subscription;

  ngOnInit() {
    this.state = this.appState.state;
    this.socket = this.socketService.socket;
    this.directions = this.state.directions;
    this.channels = this.state.channels;

    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        route: '/direction'
      },
      right: {
        text: 'Назад',
        route: '../'
      }
    });

    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
      }
    });
  }

  getChName(id) {
    const idx = this.channels.findIndex(x => x.id == id);
    return this.channels[idx].name;
  }

  changeCurMode(dir) {
    this.appState.storage.set('curMode', dir);
    this.router.navigate(["/"]);
    const index = this.state.channels.findIndex(x => x.id === dir.channelId);
    this.socket.emit('setChannel', this.state.channels[index]);
  }
}
