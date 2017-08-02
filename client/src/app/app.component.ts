import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor (
    private stateService: StateService
  ) {}

  public subscription;

  ngOnInit() {
    this.subscription = this.stateService.buttons.subscribe(data => {
      console.log(data);
      this.stateService.footerButtons.left = 'qweqwe';
    });
  }

  button_push(button) {
    this.stateService.button_push(button);
  }
}
