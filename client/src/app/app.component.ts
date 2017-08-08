import { Component, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { SocketService } from './services/socket.service';
import { Subject } from 'rxjs';
import { randomInt } from './utils/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor (
    private appState: AppState,
    private socketService : SocketService
  ) {}

  ngOnInit() {
    this.initState();
  }

  initState() {
    this.appState.set('button', new Subject<any>());
    this.appState.set('messages',this.appState.storage.get('messages'));
    this.appState.set('channels',this.appState.storage.get('channels'));
    this.appState.set('directions',this.appState.storage.get('directions'));
    this.appState.set('ssi',this.appState.storage.get('ssi'));
    if (!this.appState.state.ssi)
      this.appState.storage.set('ssi', randomInt(1, 256));
    this.socketService.init(this.appState.state.ssi);
  }

  button_push(button) {
    this.appState.button_push(button);
  }
}
