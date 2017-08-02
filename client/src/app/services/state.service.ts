import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StateService {

  constructor() { }

  public button = new Subject<any>();

  button_push(button) {
    this.button.next({button});
  }

  get buttons(): Observable<any> {
    return this.button.asObservable();
  }
}
