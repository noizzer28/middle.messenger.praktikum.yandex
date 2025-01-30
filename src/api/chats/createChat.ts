import chatsApi from './chatsApi';
import getChats from './getChats';

class createChatController {
  public async create(input: HTMLInputElement) {
    try {
      if (input.value) {
        const body = {
          title: input.value
        };
        const response = await chatsApi.createChat(body);
        console.log(response);
        input.value = '';
        getChats.getInfo();
      }
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new createChatController();
