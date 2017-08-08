import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  constructor() { }

  @Input() menuItems: string;

  ngOnInit() {}

}
