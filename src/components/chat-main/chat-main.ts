import Block from '../../services/Block';
import template from './template';
import './chat-main.scss';
import { TProps, TStore } from '../../types';
import { chatHeader } from './chat-header/chat-header';
import { getAvatarLink } from '../../utils/avatarLink';
import chatDropdown from './chat-dropdown/chat-dropdown';
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
      },
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target) {
            const sendMessageBtn = target.closest('#chat-input__btn');
            if (sendMessageBtn) {
              const input = document.getElementById(
                'chat-input'
              ) as HTMLInputElement;
              if (input) {
                const value = input.value;
                socket.sendMessage(value);
              }
            }
          }
        }
      }
    });
    // this.scrollDown();
  }
  scrollDown() {
    document.addEventListener('DOMContentLoaded', () => {
      const chat = document.getElementById('#chat-scroll');
      console.log(chat);
      if (chat) {
        chat.scrollTop = chat?.scrollHeight;
      }
    });
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
    console.log('chat main', activeMessages);
    return {
      asideMessage: null,
      header: chatHeader,
      message: activeMessages.reverse().map((message) => {
        const isCurrentUser = message.user_id === userId ? true : false;
        return new ChatMessagesList('div', {
          attr: {
            class: `chat-main__block  ${isCurrentUser ? 'sender' : 'receiver'}`
          },
          text: message.content,
          time: formatDate(message.time)
        });
      })
    };
  } else {
    return {
      asideMessage: 'Выберите чат чтобы начать'
    };
  }
}

const Connect = connect(ChatMain, mapChoosenChat);
export const chatMain = new Connect('div', {});
