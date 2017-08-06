import { Component, OnInit } from '@angular/core';
import {AppState} from '../../../../../../app.service';

@Component({
  selector: 'create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  name;
  mode;
  frequency;

  state;

  constructor(private appState: AppState) { }

  ngOnInit() {
    this.state = this.appState.state;
  }

  addChannel() {
    this.appState.storage.set(
      'channels',
      {
        name: this.name,
        mode: this.mode,
        frequency: this.frequency,
      }
    );
  }
}
