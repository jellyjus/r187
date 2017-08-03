import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'footer-buttons',
  templateUrl: './footer-buttons.component.html',
  styleUrls: ['./footer-buttons.component.css']
})
export class FooterButtonsComponent implements OnInit {

  constructor(
    private appState: AppState,
    private router: Router
  ) { }

  state;

  ngOnInit() {
    this.state = this.appState.state;
  }

  buttonClick(type) {
    this.router.navigate([this.appState.state['footerButtons'][type].route]);
  }
}
