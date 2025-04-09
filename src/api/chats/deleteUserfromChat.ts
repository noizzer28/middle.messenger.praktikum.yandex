import chatsApi from './chatsApi';
import { ChangeChatUsersInterface } from '../types';
import store from '../../services/Store';

class DeleteUser {
  public async deleteUser(id: number) {
    try {
      const state = store.getState();
      const data: ChangeChatUsersInterface = {
        users: [id],
        chatId: state.activeChat?.id
      };
      const resp = await chatsApi.deleteUserFromChat(data);
      return resp;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
export default new DeleteUser();
