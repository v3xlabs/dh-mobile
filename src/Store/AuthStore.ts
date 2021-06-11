import { autorun, makeAutoObservable, runInAction } from 'mobx';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMeQuery } from '../GQL/GraphqlOperations';

/**
 * AuthStore
 * Mobx StateManagement
 * @method setToken: (token: string | null) => void
 * @method isLoggedIn: computed constants -- reactive
 */
class AuthStoreClass {
  /**
   * User token in store
   */
  token: string | null = null;
  /**
   * Currently logged in user's information
   * @observable
   */
  Me: IMeQuery['me'] | null = null;

  /**
   * Refetch currently logged in user's information from server
   */
  refetchUser: () => Promise<unknown> = async () => {};
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

  /**
   * method for setting user token to storage
   *
   * @param { string } token  - user token to set
   */
  setToken = (token: string | null): void => {
    this.token = token;
    this.refetchUser();
  };

  /**
   * Set user to AuthStore
   * @param User
   * @return { void }
   */
  setUser = (
    User: IMeQuery['me'] | null,
    refetchUser: () => Promise<unknown>
  ): void => {
    this.Me = User;
    this.refetchUser = refetchUser;
  };

  /**
   * Logout method
   */
  logout = async () => {
    this.token = null;
    this.Me = null;
    await AsyncStorage.setItem('@token', '');
  };
  /**
   * Computed property*
   * Should be used as a constant, not to be invoked
   *
   * @return { boolean }
   */
  get isLoggedIn(): boolean {
    return !!this.token;
  }
  disposeAutorun = () => {
    dispose?.();
  };
}

export const AuthStore = new AuthStoreClass();

const dispose = autorun(async () => {
  try {
    if (AuthStore.token?.length) {
      await AsyncStorage.setItem('@token', AuthStore.token || '');
    }
  } catch (error) {
    console.log(`TokenSetError@Store/AuthStore`, error);
  }
});
