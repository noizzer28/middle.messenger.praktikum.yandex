import chatsApi from './chatsApi';
import store from '../../services/Store';
import getChats from './getChats';

class ChangeChatAvatarController {
  public async changeChatAvatar(file: File) {
    try {
      const state = store.getState();
      const formData = new FormData();
      if (state.activeChat?.id) {
        formData.append('avatar', file);
        formData.append('chatId', String(state.activeChat?.id));
        const response = await chatsApi.changeAvatar(formData);
        console.log('Изменения успешны:', response);
        getChats.getInfo();
      }
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
export default new ChangeChatAvatarController();
