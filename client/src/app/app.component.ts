import { Component, OnInit } from '@angular/core';
import { AppState } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor (
    private appState: AppState
  ) {}

  ngOnInit() {}

  button_push(button) {
    //this.appState.button_push(button);
  }
}
