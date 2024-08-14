class BaseStorage {
  constructor() {
    if (new.target === BaseStorage) {
      throw new TypeError('Cannot construct BaseStorage instances directly');
    }
  }
  setItem(key, value) {
    throw new Error(`Method 'set' must be implemented. ${key} , ${value}`);
  }
  getItem(key) {
    throw new Error(`Method 'get' must be implemented. ${key}`);
  }
  removeItem(key) {
    throw new Error(`Method 'remove' must be implemented. ${key}`);
  }
  clear() {
    throw new Error("Method 'clear' must be implemented.");
  }
}

export default BaseStorage;
