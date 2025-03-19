import store from '../../services/Store';
import socket from '../ws/chatSocket';

class SocketController {
  public async connect(token: string, chatID: string) {
    try {
      const state = store.getState();
      const userId = String(state.user?.id);
      const activeChat = state.chatList?.filter((chat) => {
        return chat.id === Number(chatID);
      });
      console.log('setting chat here', chatID, activeChat);
      store.set({ activeChat: activeChat[0], activeMessages: [] });
      socket.init(userId, String(chatID), token);
      // socket.getOlderMessages();
      // socket.sendMessage('second message');
      //   return response;
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new SocketController();
