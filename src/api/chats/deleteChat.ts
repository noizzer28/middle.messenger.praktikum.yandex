import chatsApi from './chatsApi';
import { DeleteChatInterface } from '../types';
import store from '../../services/Store';
import getChats from './getChats';

class DeleteChat {
  public async delete() {
    try {
      const state = store.getState();
      if (state.activeChat?.id) {
        const data: DeleteChatInterface = {
          chatId: state.activeChat?.id
        };
        const resp = await chatsApi.deleteChat(data);
        getChats.getInfo();
        store.set({ activeChat: null, activeMessages: null });
        return resp;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
export default new DeleteChat();
