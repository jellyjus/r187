import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../services/state.service'

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) { }

  public footerButtons = {
    left: 'Меню',
    right: 'Направление'
  };

  ngOnInit() {
    this.stateService.footerButtons = this.footerButtons;
  }

}
