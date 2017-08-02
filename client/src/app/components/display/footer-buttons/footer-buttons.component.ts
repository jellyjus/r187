import { Component, OnInit, OnChanges } from '@angular/core';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'footer-buttons',
  templateUrl: './footer-buttons.component.html',
  styleUrls: ['./footer-buttons.component.css']
})
export class FooterButtonsComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) { }

  public footerButtons = {
    left: null,
    right: null
  };

  ngOnInit() {
    this.footerButtons = this.stateService.footerButtons;
  }

}
