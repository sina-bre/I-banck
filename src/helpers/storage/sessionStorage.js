import BaseStorage from './baseStorage.js';

class SessionStorage extends BaseStorage {
  setItem(key, value) {
    sessionStorage.setItem(key, value);
  }
  getItem(key) {
    return sessionStorage.getItem(key);
  }
  removeItem(key) {
    sessionStorage.removeItem(key);
  }
  clear() {
    sessionStorage.clear();
  }
}

export default SessionStorage;
