import { BaseStorage } from './baseStorage.js';

export class LocalStorage extends BaseStorage {
  set(key, value) {
    localStorage.setItem(key, value);
  }
  get(key) {
    return localStorage.getItem(key);
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
