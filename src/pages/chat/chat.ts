import Block from '../../services/Block';
import template from './template';
import ChatList from '../../components/chat-aside/chat-list';
import search from '../../components/search/search';
import getChats from '../../api/chats/getChats';
import { connect } from '../../services/connect';
import { TStore, TProps } from '../../types';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/button/button/button';
import createChat from '../../api/chats/createChat';
import getChatToken from '../../api/chats/getChatToken';
import { getAvatarLink } from '../../utils/avatarLink';
import connectSocket from '../../api/chats/connectSocket';
import { chatMain } from '../../components/chat-main/chat-main';
class ChatPage extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'chat rel'
      },
      search: search,
      btn: new Button('div', {
        text: 'Создать чат',
        events: {
          click: () => {
            createChat.create('Chat');
          }
        }
      })
    });
    this.getChatsInfo();
  }
  async getChatsInfo() {
    await getChats.getInfo();
  }
  render() {
    return this.compile(template);
  }
}

function mapChatsToProps(state: TStore): TProps {
  const chatList = state.chatList;
  const activeChat = state.activeChat;
  const userId = state.user?.id;
  if (chatList.length > 0) {
    return {
      chatList: chatList.map((chat) => {
        let time;
        let content;
        let isYou = undefined;
        const isActive = chat.id === activeChat?.id;
        if (chat.last_message) {
          isYou = chat.created_by === userId;
          time = chat.last_message ? formatDate(chat.last_message.time) : null;
          content = chat.last_message.content;
        }
        return new ChatList('li', {
          attr: {
            class: `chat-list ${isActive && 'selected'}`,
            dataId: chat.id
          },
          avatar: getAvatarLink(chat.avatar),
          chatName: chat.title,
          lastMessage: content,
          you: isYou,
          time: time,
          events: {
            click: (e: Event) => {
              const target = e.target as HTMLElement;
              if (target) {
                const parentWithDataIndex = target.closest('[dataId]');
                if (parentWithDataIndex) {
                  const dataId = parentWithDataIndex.getAttribute('dataId');
                  if (dataId !== null) {
                    removeSelected();
                    parentWithDataIndex.classList.add('selected');
                    render(Number(dataId));
                  } else {
                    console.log('Атрибут dataindex не найден');
                  }
                } else {
                  console.log('Родитель с атрибутом dataindex не найден');
                }
              }
            }
          }
        });
      }),
      asideMessage: 'Выберите чат чтобы начать',
      chatMain: chatMain
    };
  } else {
    console.log('empty chats');
    return {
      chatList: null,
      asideMessage: 'Здесь еще нет ни одного сообщения'
    };
  }
}

const Connect = connect(ChatPage, mapChatsToProps);
export const chatPage = new Connect('main', {});

async function render(dataId: number) {
  // console.log(chats, dataId);
  const token = await getChatToken.getToken(dataId);
  if (token) {
    connectSocket.connect(token, String(dataId));
  }
}

function removeSelected() {
  const selectedElementsArray = Array.from(
    document.querySelectorAll('.selected')
  );
  selectedElementsArray.forEach((element) => {
    element.classList.remove('selected');
  });
}
