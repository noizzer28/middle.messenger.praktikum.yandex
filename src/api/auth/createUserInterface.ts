import authApi from './authApi';
import { validateProfile } from '../../utils/validators';
import { CreateUserModel } from '../types';
import getUserInfo from './getUserInfo';
import { router } from '../../index';

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
      getUserInfo.getInfo();
      router.go('/messenger');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ошибка авторизации:', error.message || error);
      }
    }
  }
}
export default new CreateUserController();
