import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../../../../../app.service';
import {SocketService} from '../../../../../../services/socket.service';

@Component({
  selector: 'dmo-mode',
  templateUrl: './dmo-mode.component.html',
  styleUrls: ['./dmo-mode.component.css']
})
export class DmoModeComponent implements OnInit {

  menuName = "DMO";
  icon = "fa-signal";
  subscription;
  state;
  socket;
  trigger = false;
  ssi;

  constructor(
    private router: Router,
    private appState: AppState,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.state = this.appState.state;
    this.socket = this.socketService.socket;
    const index = this.router.url.lastIndexOf('/');
    const path = `..${this.router.url.slice(0, index)}`;
    this.ssi = this.state.ssi;
    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        func: this.changeSSI.bind(this)
      },
      right: {
        text: 'Назад',
        route: path
      }
    });
    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
        case 11:
          //this.items[this.curIndex].route ? this.router.navigate([this.items[this.curIndex].route]) : null;
          break;
      }
    });
  }

  onClick() {
    this.trigger = true;
  }

  changeSSI() {
    this.appState.storage.set('ssi', this.ssi);
    this.socket.emit('setId', this.ssi);
    this.trigger = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
