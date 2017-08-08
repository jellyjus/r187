import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as serverConfig from '../../../../server-config.json';
import {AppState} from '../app.service'

@Injectable()
export class SocketService {

  constructor(
    private appState: AppState
  ) {}

  public socket;
  private state;
  private url = `${serverConfig['host']}:${serverConfig['port']}`;

  init() {
    this.state = this.appState.state;
    this.socket = io(this.url);

    this.socket.emit('setId', this.state.ssi);

    if (this.state.curMode && this.state.channels) {
      const index = this.state.channels.findIndex(x => x.id === this.state.curMode.channelId);
      this.socket.emit('setChannel', this.appState.state.channels[index]);
    }

    this.socket.on('newMessage', (data) => {
      console.log('newMessage', data);
      data.date = new Date().toLocaleString();
      this.appState.storage.push('recvMsgs', data);
    })
  }

}
