import { BaseStorage } from './baseStorage.js';
import { LocalStorage } from './localStorage.js';
import { SessionStorage } from './sessionStorage.js';

export class SecureStorage extends BaseStorage {
  constructor(encryptionKey, storageType = 'localStorage') {
    super();
    this.encryptionKey = encryptionKey;

    const storageMap = {
      localStorage: LocalStorage,
      sessionStorage: SessionStorage,
    };

    const StorageClass = storageMap[storageType];
    if (!StorageClass) {
      throw new Error(
        "Invalid storage type. Use 'localStorage' or 'sessionStorage'."
      );
    }

    this.storage = new StorageClass();
  }

  async getKeyMaterial() {
    const enc = new TextEncoder();
    return window.crypto.subtle.importKey(
      'raw',
      enc.encode(this.encryptionKey),
      'PBKDF2',
      false,
      ['deriveKey']
    );
  }

  async getKey() {
    const keyMaterial = await this.getKeyMaterial();
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(value) {
    const key = await this.getKey();
    const enc = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      enc.encode(value)
    );
    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
    };
  }

  async decrypt(encryptedValue) {
    const key = await this.getKey();
    const iv = new Uint8Array(encryptedValue.iv);
    const encryptedData = new Uint8Array(encryptedValue.data);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encryptedData
    );
    const dec = new TextDecoder();
    return dec.decode(decrypted);
  }

  async set(key, value) {
    const encryptedValue = await this.encrypt(value);
    this.storage.set(key, JSON.stringify(encryptedValue));
  }

  async get(key) {
    const encryptedValue = this.storage.get(key);
    if (encryptedValue) {
      return await this.decrypt(JSON.parse(encryptedValue));
    }
    return null;
  }

  remove(key) {
    this.storage.remove(key);
  }

  clear() {
    this.storage.clear();
  }
}
