import BaseStorage from './baseStorage.js';
import LocalStorage from './localStorage.js';
import SessionStorage from './sessionStorage.js';
import CryptoJS from 'crypto-js';

export class SecureStorage extends BaseStorage {
  constructor(encryptionKey, storageType = 'localStorage') {
    super();
    this.encryptionKey = encryptionKey;

    const storageMap = {
      localStorage: LocalStorage,
      sessionStorage: SessionStorage
    };

    const StorageClass = storageMap[storageType];
    if (!StorageClass) {
      throw new Error("Invalid storage type. Use 'localStorage' or 'sessionStorage'.");
    }

    this.storage = new StorageClass();
  }

  encrypt(value) {
    try {
      // Ensure value is a string
      if (typeof value !== 'string') {
        throw new Error('Value must be a string');
      }
      const encrypted = CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
      return encrypted;
    } catch (e) {
      console.error('Encryption failed:', e);
      return null;
    }
  }

  decrypt(encryptedValue) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      // Check if decryption returned valid UTF-8 string
      if (!decrypted) {
        throw new Error('Decryption result is not valid UTF-8');
      }

      return decrypted;
    } catch (e) {
      console.error('Decryption failed:', e);
      return null;
    }
  }

  setItem(key, value) {
    try {
      console.log('settttttt');
      const encryptedValue = this.encrypt(value);
      if (encryptedValue !== null) {
        this.storage.setItem(key, encryptedValue);
      }
    } catch (e) {
      console.error('Failed to set item:', e);
    }
  }

  getItem(key) {
    try {
      const encryptedValue = this.storage.getItem(key);
      if (encryptedValue) {
        return this.decrypt(encryptedValue);
      }
      return null;
    } catch (e) {
      console.error('Failed to get item:', e);
      return null;
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove item:', e);
    }
  }

  clear() {
    try {
      this.storage.clear();
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  }
}

export default SecureStorage;
