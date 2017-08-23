import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import * as io from 'socket.io-client';
import * as serverConfig from '../../../../server-config.json';
import { AppState } from '../app.service'
import { notifications } from '../utils/index'

@Injectable()
export class SocketService {

  constructor(
    private appState: AppState,
    private notify: NotificationsService
  ) {}

  public socket;
  private state;
  private url = `${serverConfig['host']}:${serverConfig['port']}`;
  private notificationsOptions = {
    position: ["bottom", "left"],
    timeOut: 5000,
    showProgressBar: false
  };

  init() {
    this.state = this.appState.state;
    this.socket = io(this.url);

    this.socket.emit('setId', this.state.ssi);

    if (this.state.curMode && this.state.channels) {
      const index = this.state.channels.findIndex(x => x.id === this.state.curMode.channelId);
      this.socket.emit('setChannel', this.appState.state.channels[index]);
    }

    this.socket.on('newMessage', (data) => {
      data.date = new Date().toLocaleString();
      data.isRead = false;
      this.appState.storage.push('recvMsgs', data);
      notifications.push(this.state.notifications, {type: 'newMessage', icon: 'fa-envelope'})
    });

    this.socket.on('error', message => {
      this.notify.error(
        'Ошибка',
        message,
        this.notificationsOptions
      );
    })
  }
}
