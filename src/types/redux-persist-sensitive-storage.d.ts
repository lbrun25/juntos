declare module 'redux-persist-sensitive-storage' {
  export default function createSensitiveStorage(options: {
    keychainService: string;
    sharedPreferencesName: string;
  }): AsyncStorageStatic;
}
