import Store from '../services/Store';
import { ROUTES } from '../types';
import getUserInfo from '../api/auth/getUserInfo';
import { router } from '..';

export async function LoginUser() {
  console.log('login user');
  try {
    const response = await getUserInfo.getInfo();
    // console.log(response);
    Store.set({ user: response });
    router.isLoggedIn(true);
  } catch (error) {
    Store.set({ user: null });
    router.isLoggedIn(false);
    router.go(ROUTES.LOGIN);
    if (error instanceof Error) {
      console.error(error.message || error);
    }
  }
}
