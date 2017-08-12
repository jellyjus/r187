import { Component, OnInit } from '@angular/core';
import {isUndefined} from "util";

@Component({
  selector: 'rtc',
  templateUrl: './rtc.component.html',
  styleUrls: ['./rtc.component.css']
})
export class RTCComponent implements OnInit {

  constructor() { }

  micro = true;
  roomName = 'ballroom';
  users;

  ngOnInit() {
    this.rtcConnect();
  }

  enableMicro(enable?) {
    this.micro = isUndefined(enable) ? !this.micro : enable ;
    easyrtc.enableMicrophone(this.micro, null);
    console.log('micro', this.micro)
  }

  onError (errCode, errText) {
    console.log('Error:', errCode, errText)
  };

  onConnect(id) {
    console.log('connected', id);
    easyrtc.joinRoom(this.roomName, null, this.onRoomJoin.bind(this), this.onError);
  }

  onRoomJoin(roomName) {
    console.log("I'm now in room " + roomName);
    this.enableMicro(false);
    easyrtc.setRoomOccupantListener(this.onRoomConnect.bind(this));
  }

  onRoomConnect(roomName, users) {
    if (roomName == this.roomName) {
      if (users) {
        this.users = users;
        console.log('users conencted', this.users)
      }
    }
  }

  call() {
    for (let user in this.users)
      easyrtc.call(
        user,
        () => console.log('success call'),
        this.onError,
        (wasAccepted, easyrtcid) => console.log('accept', wasAccepted, easyrtcid),
        null
      );
  }

  rtcConnect(){
    easyrtc.enableVideo(false);
    easyrtc.enableVideoReceive(false);

    easyrtc.initMediaSource(
      () => {
        easyrtc.connect("DMO", this.onConnect.bind(this), this.onError);
      },
      this.onError, null
    );

    easyrtc.setStreamAcceptor( function(easyrtcid, stream) {
      var audio = document.getElementById('callerAudio');
      easyrtc.setVideoObjectSrc(audio,stream);
    });

    easyrtc.setOnStreamClosed( function (easyrtcid) {
      easyrtc.setVideoObjectSrc(document.getElementById('callerAudio'), null);
    });
  }

}
