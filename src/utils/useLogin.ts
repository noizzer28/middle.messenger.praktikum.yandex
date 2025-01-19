import Store from '../services/Store';
import { ROUTES } from '../types';
import getUserInfo from '../api/auth/getUserInfo';
import { router } from '..';

export async function LoginUser() {
  try {
    const response = await getUserInfo.getInfo();
    // console.log(response);
    Store.set({ user: response });
    router.isLoggedIn(true);
  } catch (error) {
    Store.reset();
    router.isLoggedIn(false);
    router.go(ROUTES.LOGIN);
    if (error instanceof Error) {
      console.error(error.message || error);
    }
  }
}
