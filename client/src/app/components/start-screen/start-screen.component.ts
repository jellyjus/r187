import { Component, OnInit,OnDestroy  } from '@angular/core';
import {AppState} from '../../app.service'
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

  subscription;
  public startScreen = {
    time: null,
    energy: null,
    activeIcons: [],
    mode: null,
    gsm: null,
    reception: null
  };


  ngOnInit() {
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
          this.router.navigate([this.appState.state['footerButtons'].left.route]);
          break;
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
