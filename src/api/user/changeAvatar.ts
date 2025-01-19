import userApi from './userApi';
import store from '../../services/Store';
import { modalAddAvatar } from '../../components/avatar/avatar';

class ChangeAvatarController {
  public async changeAvatar(file: File) {
    try {
      if (file) {
        console.log(file);
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await userApi.changeAvatar(formData);
        console.log('Изменения успешны:', response);
        store.set({ user: response });
      } else {
        console.log('no file');
        store.set({ error: { modalError: 'Сначала выберите файл' } });
        modalAddAvatar.show();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Ошибка сети') {
          store.set({
            error: {
              modalError: 'Ошибка, попробуйте загрузить файл меньшего размера'
            }
          });
          modalAddAvatar.show();
          return;
        }
        store.set({ error: { modalError: error.message } });
        modalAddAvatar.show();
        console.log('Ошибка обновления данных:', error.message);
      } else {
        store.set({ error: { modalError: error } });
        modalAddAvatar.show();
        console.log('Произошла неизвестная ошибка:', error);
      }
    }
  }
}
export default new ChangeAvatarController();
