import HTTPTransport from '../HttpTransport';
import { CreateChatInterface, ChangeChatUsersInterface } from '../types';

const chatsApi = new HTTPTransport();

export class ChatsApi {
  getChats(url?: string) {
    return chatsApi.get(`chats${url || ''}`);
  }

  createChat(data: CreateChatInterface) {
    return chatsApi.post('chats', {
      body: data
    });
  }

  addUserIntoChat(data: ChangeChatUsersInterface) {
    return chatsApi.put('chats/users', {
      body: data
    });
  }

  deleteUserFromChat(data: ChangeChatUsersInterface) {
    return chatsApi.post('chats/users', {
      body: data
    });
  }

  getChatToken(id: number) {
    return chatsApi.post(`chats/token/${id}`);
  }
}
export default new ChatsApi();
