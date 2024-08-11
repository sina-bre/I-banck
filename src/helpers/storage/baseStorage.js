class BaseStorage {
  constructor() {
    if (new.target === BaseStorage) {
      throw new TypeError('Cannot construct BaseStorage instances directly');
    }
  }
  set(key, value) {
    throw new Error(`Method 'set' must be implemented. ${key} , ${value}`);
  }
  get(key) {
    throw new Error(`Method 'get' must be implemented. ${key}`);
  }
  remove(key) {
    throw new Error(`Method 'remove' must be implemented. ${key}`);
  }
  clear() {
    throw new Error("Method 'clear' must be implemented.");
  }
}

export default BaseStorage;
