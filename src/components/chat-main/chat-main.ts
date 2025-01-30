import Block from '../../services/Block';
import template from './template';
import './chat-main.scss';
import { TProps, TStore } from '../../types';
import { chatHeader } from './chat-header/chat-header';
import { connect } from '../../services/connect';
import { formatDate } from '../../utils/formatDate';
import ChatMessagesList from './chat-messages-list/chat-messages-list';
import socket from '../../api/ws/chatSocket';
class ChatMain extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'chat-main__messages'
      }
    });
  }
  componentDidMount() {
    this.addInputListener();
    this.addBtnListener();
  }

  handleSend() {
    const input = document.getElementById('chat-input') as HTMLInputElement;
    if (input) {
      const value = input.value.trim();
      if (value) {
        socket.sendMessage(value);
      }
    }
  }
  private addInputListener() {
    const input = this.getContent().querySelector(
      '#chat-input'
    ) as HTMLInputElement;
    input?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') this.handleSend();
    });
  }

  private addBtnListener() {
    const btn = this.getContent().querySelector('#chat-input__btn');
    btn?.addEventListener('click', (e) => this.handleSend());
  }
  render() {
    return this.compile(template);
  }
}

function mapChoosenChat(state: TStore) {
  const activeChat = state.activeChat;
  const activeMessages = state.activeMessages;
  const userId = state.user?.id;
  if (activeChat) {
    const messArr = activeMessages.map((message) => {
      const isCurrentUser = message.user_id === userId ? true : false;
      return new ChatMessagesList('div', {
        attr: {
          class: `chat-main__block  ${isCurrentUser ? 'sender' : 'receiver'}`
        },
        text: message.content,
        time: formatDate(message.time)
      });
    });
    return {
      asideMessage: null,
      header: chatHeader,
      message: messArr
    };
  } else {
    return {
      asideMessage: 'Выберите чат чтобы начать'
    };
  }
}

const Connect = connect(ChatMain, mapChoosenChat);
export const chatMain = new Connect('div', {});
