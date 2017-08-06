import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-menu',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() name;
  @Input() icon;

  constructor() { }

  ngOnInit() {
  }

}
