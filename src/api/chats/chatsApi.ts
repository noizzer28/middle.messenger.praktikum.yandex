import HTTPTransport from '../HttpTransport';
import {
  CreateChatInterface,
  ChangeChatUsersInterface,
  DeleteChatInterface
} from '../types';

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
    return chatsApi.delete('chats/users', {
      body: data
    });
  }

  getChatToken(id: number) {
    return chatsApi.post(`chats/token/${id}`);
  }

  getChatUsers(id: number) {
    return chatsApi.get(`chats/${id}/users`);
  }

  deleteChat(data: DeleteChatInterface) {
    return chatsApi.delete(`chats`, {
      body: data
    });
  }

  changeAvatar(data: FormData) {
    return chatsApi.put('chats/avatar', {
      body: data
    });
  }
}
export default new ChatsApi();
