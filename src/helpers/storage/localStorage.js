import BaseStorage from './baseStorage.js';

class LocalStorage extends BaseStorage {
  setItem(key, value) {
    localStorage.setItem(key, value);
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  removeItem(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

export default LocalStorage;
