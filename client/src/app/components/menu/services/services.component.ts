import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AppState} from '../../../app.service';
import {getParentURL} from '../../../utils/index';

@Component({
  selector: 'services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {

  parentUrl;
  subscription;
  curIndex;
  items = [
    {
      name: 'Редактор данных',
      route: null,
      active: false
    }
  ];

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private appState: AppState
  ) { }

  async ngOnInit() {
   this.parentUrl = await getParentURL(this.aRoute);
    this.appState.set('footerButtons', {
      left: {
        text: 'Выбрать',
        route: null
      },
      right: {
        text: 'Назад',
        route: this.parentUrl
      }
    });

    this.subscription = this.appState.state.button.subscribe(data => {
      switch (data) {
        case 13:
          this.router.navigate([this.appState.state['footerButtons'].right.route]);
          break;
        case 11:
          this.items[this.curIndex].route ? this.router.navigate([this.items[this.curIndex].route]) : null;
          break;
      }
    });
  }

  menuClick(i) {
    this.curIndex = i;
    this.items[this.curIndex].route ? this.router.navigate([this.router.url + this.items[this.curIndex].route]) : null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
