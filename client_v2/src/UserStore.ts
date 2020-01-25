import { extendObservable, runInAction } from 'mobx';
// @ts-ignore
import SessionStore from 'mobx-session';

import { signIn, logout } from './services/api';

class Store {
  user: any;
  loginError: boolean = false;
  logoutError: boolean = false;

  constructor() {
    SessionStore.initialize({ name: 'example-app' });

    extendObservable(this, {
      user: null,
      loginError: false,
      logoutError: false,
      get loggedIn() {
        return this.user !== null && SessionStore.hasSession;
      }
    });

    runInAction('Load user', async () => {
      this.user = await SessionStore.getSession();
    });
  }

  saveUser = async (session: any) => {
    await SessionStore.saveSession(session);
    runInAction('Save user', () => {
      this.user = session;
    });
  }

  removeUser = () => {
    SessionStore.deleteSession();
    runInAction('Logout user', () => {
      this.user = null;
    });
  }

  login = async (user: any, history: any) => {
    try {
      runInAction('Init Login', () => {
        this.loginError = false;
      });
      const { data } = await signIn(user.login, user.password);
      await this.saveUser(data);
      history.push(`/profile/${data.user_id}`);
    } catch (error) {
      runInAction('Error Login', () => {
        this.loginError = error.errors;
      });
    }
  }

  logout = async () => {
    try {
      runInAction('Init Logout', () => {
        this.logoutError = false;
      });
      await logout();
      this.removeUser();
    } catch (error) {
      runInAction('Error Logout', () => {
        this.logoutError = error.errors;
      });
    }
  }
}

const UserStore = new Store();

export default UserStore;