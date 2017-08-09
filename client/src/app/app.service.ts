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
      window.localStorage.setItem(key, JSON.stringify(object));
      this.set(key, object);
    },
    delete: (key, idx) => {
      const data = JSON.parse(window.localStorage.getItem(key));
      data.splice(idx, 1);
      this.storage.set(key, data);
    },
    update: (key, obj, idx) => {
      const data = JSON.parse(window.localStorage.getItem(key));
      data.splice(idx, 1, obj);
      this.storage.set(key, data);
    },
    push: (key, object) => {
      const data = JSON.parse(window.localStorage.getItem(key));
      if (!data) {
        this.set(key, [object]);
        return window.localStorage.setItem(key, JSON.stringify([object]))
      }
      if (!Array.isArray(data)) {
        throw Error('Error on push local storage. Target is not a array!');
      }

      data.push(object);
      this.storage.set(key, data);
      this.set(key, data);
    }
  }
}
