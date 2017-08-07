import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'footer-buttons',
  templateUrl: './footer-buttons.component.html',
  styleUrls: ['./footer-buttons.component.css']
})
export class FooterButtonsComponent implements OnInit {

  constructor(
    private appState: AppState,
    private router: Router,
  ) { }

  state;

  ngOnInit() {
    this.state = this.appState.state;
  }

  buttonClick(type) {
    if (this.appState.state['footerButtons'][type].func) {
      this.appState.state['footerButtons'][type].func()
    }
    else {
      this.appState.state['footerButtons'][type].route.indexOf('..') !== -1 ?
        this.router.navigate([this.appState.state['footerButtons'][type].route]) :
        this.router.navigate([this.router.url + this.appState.state['footerButtons'][type].route]);
    }
  }
}
