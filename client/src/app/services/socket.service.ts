import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as serverConfig from '../../../../server-config.json';
import { AppState } from '../app.service';

@Injectable()
export class SocketService {

  constructor(private appState: AppState)
  {}

  public socket;
  private url = `${serverConfig['host']}:${serverConfig['port']}`;

  init(ssi) {
    this.socket = io(this.url);

    this.socket.emit('setId', ssi);

    this.socket.on('newMessage', (data) => {
      console.log('newMessage', data);
      data.date = new Date().toLocaleString();
      this.appState.storage.push('recvMsgs', data);
    })
  }

}
