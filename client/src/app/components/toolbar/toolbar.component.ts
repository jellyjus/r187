import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  time;
  tools = [];
  mode;
  seconds;


  constructor() {

  }

  ngOnInit() {
    console.log("f");
    this.tools = [
      {
        type : 'gps',
        icon : 'fa-rocket'
      },
      {
        type : 'gps',
        icon : 'fa-rocket'
      }
    ];
    this.mode = 'Дежурный прием';
    var d = new Date();
    this.time = d.getHours() + ':' + d.getMinutes();
    this.seconds = ':' + d.getSeconds();
    setInterval(() => {
      var d = new Date();
      this.time = d.getHours() + ':' + d.getMinutes();
      this.seconds = ':' + d.getSeconds();
    }, 1000);
  }

}
