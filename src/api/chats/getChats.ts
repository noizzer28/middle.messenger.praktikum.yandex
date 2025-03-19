import chatsApi from './chatsApi';
import store from '../../services/Store';

class GetChatsController {
  public async getInfo() {
    try {
      const response = await chatsApi.getChats();
      // console.log('список чатов', response);
      store.set({
        chatList: response
      });
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new GetChatsController();
