import userApi from './userApi';
import store from '../../services/Store';
import { ModalEditPassword } from '../../pages/profile/profile-page';
import { ChangeUserPassword } from '../types';

class ChangePasswordController {
  public async changePassword(id: string) {
    try {
      const form = document.getElementById(id) as HTMLFormElement;
      if (!form || !(form instanceof HTMLFormElement)) {
        throw new Error('Форма не найдена или не является HTMLFormElement');
      }
      const inputs = form?.querySelectorAll('input');
      const data = {} as ChangeUserPassword;
      if (inputs) {
        data.oldPassword = inputs[0].value.trim();
        data.newPassword = inputs[1].value.trim();
      }
      const response = await userApi.changePassword(data);
      console.log(response);
      if (response === 'OK') {
        store.set({
          error: { modalPasswordError: '' },
          success: { modalSuccess: 'Пароль успешно изменён' }
        });
        inputs.forEach((input) => {
          input.value = '';
        });
        ModalEditPassword.show();
        setTimeout(() => {
          store.set({
            success: { modalSuccess: '' }
          });
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        store.set({ error: { modalPasswordError: error.message } });
        ModalEditPassword.show();
        console.log('Ошибка:', error.message);
      } else {
        store.set({ error: { modalPasswordError: error } });
        ModalEditPassword.show();
        console.log('Произошла неизвестная ошибка:', error);
      }
    }
  }
}
export default new ChangePasswordController();
