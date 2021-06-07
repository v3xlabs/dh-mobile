import { autorun, makeAutoObservable, runInAction } from 'mobx';

import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStoreClass {
  token: string | null = null;
  constructor() {
    makeAutoObservable(this);
    AsyncStorage.getItem('@token')
      .then(token => {
        runInAction(() => {
          if (token?.length) {
            this.token = token;
          } else {
            this.token = null;
          }
        });
      })
      .catch(error => console.log(`AuthTokenSetError@Store/AuthStore`, error));
  }
  setToken = (token: string | null) => {
    this.token = token;
  };
  get isLoggedIn() {
    return !!this.token;
  }
  disposeAutorun = () => {
    dispose?.();
  };
}

export const AuthStore = new AuthStoreClass();

const dispose = autorun(async () => {
  try {
    await AsyncStorage.setItem('@token', AuthStore.token || '');
  } catch (error) {
    console.log(`TokenSetError@Store/AuthStore`, error);
  }
});
