import chatsApi from './chatsApi';

type TResponse = {
  token: string;
};

class GetTokenController {
  public async getToken(chatId: number) {
    try {
      const response = (await chatsApi.getChatToken(chatId)) as TResponse;
      // console.log(response);
      const token = response.token;
      return token;
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new GetTokenController();
