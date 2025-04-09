import authApi from './authApi';
import { ROUTES } from '../../types';
import { router } from '../../index';
import { LoginUser } from '../../utils/useLogin';

class LogoutController {
  public async logout() {
    try {
      const response = await authApi.logout();
      console.log(response);
      await LoginUser();
      router.go(ROUTES.LOGIN);
    } catch (error) {
      await LoginUser();
      if (error instanceof Error) {
        console.error('Ошибка:', error.message);
      } else {
        console.error('Произошла неизвестная ошибка:', error);
      }
    }
  }
}
export default new LogoutController();
