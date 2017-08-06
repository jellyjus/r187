import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  constructor() {}

  public socket;
  private url = '192.168.0.11:80';

  init() {
    console.log('init');
    this.socket = io(this.url);
  }

}
