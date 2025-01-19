import authApi from './authApi';
import { validateProfile } from '../../utils/validators';
import { CreateUserModel } from '../types';
import { router } from '../../index';
import { LoginUser } from '../../utils/useLogin';
import Store from '../../services/Store';

class CreateUserController {
  public async login(id: string) {
    try {
      const form = document.getElementById(id) as HTMLFormElement;
      if (!form || !(form instanceof HTMLFormElement)) {
        throw new Error('Форма не найдена или не является HTMLFormElement');
      }
      const formData = new FormData(form);
      const result: Partial<CreateUserModel> = {};
      formData.forEach((value, key) => {
        if (key as keyof CreateUserModel) {
          result[key as keyof CreateUserModel] = value.toString();
        }
      });
      const completeFormObject = result as CreateUserModel;
      if (!validateProfile()) {
        throw new Error('Поля заполнены неверно');
      }
      const response = await authApi.createUser(completeFormObject);
      console.log('Регистрация  успешна:', response);
      await LoginUser();
      router.go('/messenger');
    } catch (error) {
      await LoginUser();
      if (error instanceof Error) {
        Store.set({ error: { regError: error.message } });
        console.error('Ошибка авторизации:', error.message || error);
      }
    }
  }
}
export default new CreateUserController();
