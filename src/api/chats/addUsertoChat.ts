import chatsApi from './chatsApi';
import { ChangeChatUsersInterface } from '../types';
import store from '../../services/Store';
import { modalAddUser } from '../../components/chat-main/chat-dropdown/chat-dropdown';

class AddUsertoCHat {
  public async addUser(userId: number) {
    try {
      const state = store.getState();
      const data: ChangeChatUsersInterface = {
        users: [userId],
        chatId: state.activeChat?.id
      };
      const resp = await chatsApi.addUserIntoChat(data);
      if (resp === 'OK') {
        modalAddUser.setProps({
          body_2: 'Пользователь успешно добавлен'
        });
        modalAddUser.show();
        setTimeout(() => {
          modalAddUser.setProps({
            body_2: ''
          });
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new AddUsertoCHat();
