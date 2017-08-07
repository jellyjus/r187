import { Component, OnInit,OnDestroy  } from '@angular/core';
import {AppState} from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit, OnDestroy  {

  constructor(
    private appState: AppState,
    private router: Router
  ) { }

  curMode;
  state;
  chName;
  dirName;
  channels;

  subscription;
  startScreen = {
    time: null,
    energy: null,
    activeIcons: [],
    mode: null,
    gsm: null,
    reception: null
  };


  ngOnInit() {
    this.state = this.appState.state;
    this.curMode = this.appState.storage.get('curMode')
    this.chName = this.curMode.name;
    this.channels = this.state.channels;
    this.dirName = this.getChName(this.curMode.channelId);

    this.appState.set('footerButtons', {
      left: {
        text: 'Меню',
        route: '/menu'
      },
      right: {
        text: 'Направление',
        route: '/direction'
      }
    });

    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 11:
          let navigationExtras: any = {outlets: {popup: ['menu']}};
          this.router.navigate([navigationExtras]);
          break;
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
      }
    });
  }

  getChName(id) {
    const idx = this.channels.findIndex(x => x.id == id);
    return this.channels[idx].mode;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
