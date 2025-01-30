import userApi from './userApi';
import store from '../../services/Store';

class ChangeAvatarController {
  public async changeAvatar(file: File) {
    try {
      // console.log(file);
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await userApi.changeAvatar(formData);
      console.log('Изменения успешны:', response);
      store.set({ user: response });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(
          'Неизвестная ошибка, попробуйте загрузить файл меньшего размера'
        );
      }
    }
  }
}
export default new ChangeAvatarController();
