import { Component, OnInit } from '@angular/core';
import {AppState} from '../../app.service'

@Component({
  selector: 'start-screen',
  host: {
    class: 'start-screen'
  },
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(
    private appState: AppState
  ) { }

<<<<<<< HEAD:client/src/app/components/start-screen/start-screen.component.ts

  ngOnInit() {
    this.appState.set('footerButtons', {
      left: 'Меню',
      right: 'Направление'
    });

=======
  public startScreen = {
    time: null,
    energy: null,
    activeIcons: [],
    mode: null,
    gsm: null,
    reception: null
  }

  ngOnInit() {
    this.startScreen = this.stateService.startScreen;
>>>>>>> wallpaper:client/src/app/components/display/start-screen/start-screen.component.ts
  }

}
