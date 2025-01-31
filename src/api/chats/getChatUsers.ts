import chatsApi from './chatsApi';
import store from '../../services/Store';

class GetChatUsersController {
  public async getUsers() {
    try {
      const state = store.getState();
      let response;
      if (state.activeChat?.id) {
        response = await chatsApi.getChatUsers(state.activeChat?.id);
        return response;
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new GetChatUsersController();
