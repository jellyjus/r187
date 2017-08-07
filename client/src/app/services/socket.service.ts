import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as serverConfig from '../../../../server-config.json';

@Injectable()
export class SocketService {

  constructor() {}

  public socket;
  private url = `${serverConfig['host']}:${serverConfig['port']}`;

  init() {
    this.socket = io(this.url);
  }

}
