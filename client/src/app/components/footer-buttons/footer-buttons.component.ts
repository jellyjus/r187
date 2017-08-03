import { Component, OnInit, OnChanges } from '@angular/core';
import { AppState } from '../../app.service';

@Component({
  selector: 'footer-buttons',
  templateUrl: './footer-buttons.component.html',
  styleUrls: ['./footer-buttons.component.css']
})
export class FooterButtonsComponent implements OnInit {

  constructor(
    private appState: AppState
  ) { }

  state;

  ngOnInit() {
    this.state = this.appState.state;
  }
}
