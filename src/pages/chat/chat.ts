import Block from '../../services/Block';
import template from './template';
import ChatList from '../../components/chat-aside/chat-list';
import Search from '../../components/search/search';
import ChatMain from '../../components/chat-main/chat-main';
import CHATS from '../../utils/chats';
import ChatHeader from '../../components/chat-header/chat-header';
import chatDropdown from '../../components/chat-dropdown/chat-dropdown';
import Modal from '../../components/modal/modal';

class ChatPage extends Block {
  render() {
    return this.compile(template);
  }
}

export const chatPage = new ChatPage('main', {
  attr: {
    class: 'chat rel'
  },
  chatList: CHATS.map((chat, index) => {
    return new ChatList('li', {
      attr: {
        class: 'chat-list',
        dataIndex: index
      },
      avatar: chat.avatar,
      chatName: chat.chatName,
      you: chat.you,
      lastMessage: chat.lastMessage,
      time: chat.time,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target) {
            const parentWithDataIndex = target.closest('[dataindex]');
            if (parentWithDataIndex) {
              const dataIndexValue =
                parentWithDataIndex.getAttribute('dataindex');
              if (dataIndexValue !== null) {
                removeSelected();
                parentWithDataIndex.classList.add('selected');
                render(Number(dataIndexValue));
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
  search: new Search('header', {
    attr: {
      class: 'chat-header'
    },
    page: '/settings'
  })
});

function render(attr: number) {
  const chat = CHATS[attr];
  chatPage.setProps({
    chosenChat: new ChatMain('section', {
      attr: {
        class: 'chat-main__messages'
      },
      header: new ChatHeader('div', {
        avatar: chat.avatar,
        chatName: chat.chatName,
        chatNav: chatDropdown
      }),
      you: chat.you || null,
      lastMessage: chat.lastMessage,
      time: chat.time
    })
  });
}

function removeSelected() {
  const selectedElementsArray = Array.from(
    document.querySelectorAll('.selected')
  );
  selectedElementsArray.forEach((element) => {
    element.classList.remove('selected');
  });
}
