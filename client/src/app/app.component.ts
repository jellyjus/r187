import { Component, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor (
    private appState: AppState
  ) {}

  ngOnInit() {
    this.initState();
  }

  initState() {
    this.appState.set('button', new Subject<any>());
    this.appState.set('directions', [
      {
        name: 'СП',
        type: '12ТП',
        img: null
      }
    ])
  }

  button_push(button) {
    this.appState.button_push(button);

  }
}
