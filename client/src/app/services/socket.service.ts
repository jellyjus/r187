import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  constructor() {}

  public socket;
  private url = `${window['host']}:${window['port']}`;

  init() {
    this.socket = io(this.url);
  }

}
