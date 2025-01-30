import userApi from './userApi';
import store from '../../services/Store';
import { ChangeUserData } from '../types';
import { validateProfile } from '../../utils/validators';

class ChangeUserController {
  public async changeUser(id: string) {
    try {
      const form = document.getElementById(id) as HTMLFormElement;
      if (!form || !(form instanceof HTMLFormElement)) {
        throw new Error('Форма не найдена или не является HTMLFormElement');
      }
      const formData = new FormData(form);
      const result: Partial<ChangeUserData> = {};
      formData.forEach((value, key) => {
        result[key as keyof ChangeUserData] = value.toString();
      });
      const completeFormObject = result as ChangeUserData;
      console.log(completeFormObject);
      if (!validateProfile()) {
        throw new Error('Поля заполнены неверно');
      }
      const response = await userApi.changeProfile(completeFormObject);
      console.log('Изменения успешны:', response);
      store.set({ user: response });
    } catch (error) {
      if (error instanceof Error) {
        store.set({ error: { profileError: error.message } });
        console.error('Ошибка обновления данных:', error.message);
      } else {
        store.set({ error: error });
        console.error('Произошла неизвестная ошибка:', error);
      }
    }
  }
}
export default new ChangeUserController();
