import { json } from 'stream/consumers';
import ChatList from '../../components/chat-aside/chat-list';
import store from '../../services/Store';

class WebSocketService {
  private static __instance: WebSocketService | null = null;
  private socket: WebSocket | null = null;
  // private userID: string | null;
  // private chatID: string | null;
  // private token: string | null;
  public isReady: boolean = false;
  private pingInterval: NodeJS.Timeout | null = null;
  constructor() {
    if (WebSocketService.__instance) {
      return WebSocketService.__instance;
    }
    WebSocketService.__instance = this;
    // this.init();
    // this.sendPing();
  }

  init(userID: string, chatID: string, token: string) {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`
    );

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      this.isReady = true;
      this.getOlderMessages();
      this.sendPing();
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      this.isReady = false;
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }
      console.log(
        `Соединение закрыто: ${event} ${event.code} | Причина: ${event.reason}`
      );
    });

    this.socket.addEventListener('message', (event) => {
      // console.log('message', event);
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === 'message') {
        this.getOlderMessages();
      }
      if (Array.isArray(data)) {
        store.set({ activeMessages: data });
      }
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }

  getOlderMessages() {
    this.socket?.send(
      JSON.stringify({
        content: '0',
        type: 'get old'
      })
    );
  }
  sendPing() {
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({
            type: 'ping'
          })
        );
      } else {
        console.error('Соединение не открыто. Не удалось отправить сообщение.');
      }
    }, 3000);
  }

  sendMessage(message: string) {
    console.log('message');
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message'
        })
      );
    } else {
      console.error('Соединение не открыто. Не удалось отправить сообщение.');
    }
  }

  closeConnection() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default new WebSocketService();
