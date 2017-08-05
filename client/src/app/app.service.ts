import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  state: InternalStateType = {};

  constructor() {}

  get(prop?: any) {
    return this.state.hasOwnProperty(prop) ? console.log(prop) : this.state;
  }

  set(prop: string, value: any) {
    this.state[prop] = value;
  }

  button_push(id) {
    this.state.button.next(id);
  }

  public storage = {
    get: (key) => {
      return JSON.parse(window.localStorage.getItem(key));
    },
    set: (key, object) => {
      window.localStorage.setItem(key, JSON.stringify(object))
    }
  }
}
