import authApi from './authApi';
import { validateProfile } from '../../utils/validators';
import { LoginUserModel } from '../types';
import store from '../../services/Store';
import { router } from '../..';
import { LoginUser } from '../../utils/useLogin';
import { ROUTES } from '../../types';
class LoginController {
  public async login(id: string) {
    try {
      const form = document.getElementById(id) as HTMLFormElement;
      if (!form || !(form instanceof HTMLFormElement)) {
        throw new Error('Форма не найдена или не является HTMLFormElement');
      }
      const formData = new FormData(form);
      const result: Partial<LoginUserModel> = {};
      formData.forEach((value, key) => {
        result[key as keyof LoginUserModel] = value.toString();
      });
      const completeFormObject = result as LoginUserModel;
      // if (!validateProfile()) {
      //   throw new Error('Поля заполнены неверно');
      // }
      const obj = {
        login: 'Noizzer',
        password: 'Qwerty123'
      };
      const response = await authApi.login(obj);
      console.log('Авторизация успешна:', response);
      await LoginUser();
      router.go(ROUTES.CHAT);
    } catch (error) {
      await LoginUser();
      if (error instanceof Error) {
        store.set({ error: error.message });
        console.error('Ошибка авторизации:', error.message);
      } else {
        store.set({ error: error });
        console.error('Произошла неизвестная ошибка:', error);
      }
    }
  }
}
export default new LoginController();
