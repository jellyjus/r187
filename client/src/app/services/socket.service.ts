import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as serverConfig from '../../../../server-config.json';

@Injectable()
export class SocketService {

  constructor() {}

  public socket;
  private url = `${serverConfig['host']}:${serverConfig['port']}`;

  init(ssi) {
    this.socket = io(this.url);

    this.socket.emit('setId', ssi);

    this.socket.on('newMessage', (data) => {
      console.log('newMessage', data);
    })
  }

}
