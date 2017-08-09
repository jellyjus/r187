import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppState} from '../../../app.service';
import {SocketService} from '../../../services/socket.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  constructor(
    private appState: AppState,
    private router: Router,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) { }

  subscription;
  phoneNumber;
  socket;

  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.socket = this.socketService.socket;

    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 14:
          this.sendMessage();
          break;
      }
    });
  }

  sendMessage() {
    this.socket.emit('sendMessage', {
      id: this.phoneNumber,
      message: this.route.snapshot.params.message
    });
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
