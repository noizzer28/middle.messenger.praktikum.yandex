import chatsApi from './chatsApi';
import getChats from './getChats';

class createChatController {
  public async create(title: string) {
    try {
      const body = {
        title: title
      };
      const response = await chatsApi.createChat(body);
      console.log(response);
      getChats.getInfo();
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new createChatController();
