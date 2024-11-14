import Block from '../../services/Block';
import template from './template';
import ChatList from '../../components/chat-aside/chat-list';
import Search from '../../components/search/search';
import ChatMain from '../../components/chat-main/chat-main';
import CHATS from '../../utils/chats';

class ChatPage extends Block {
  render() {
    return this.compile(template);
  }
}

export const chatPage = new ChatPage('main', {
  attr: {
    class: 'chat'
  },
  // chatList: [
  //   new ChatList('li', {
  //     attr: {
  //       class: 'chat-list'
  //     },
  //     avatar: '/profile.jpg',
  //     chatName: 'Lorem ipsum',
  //     you: 'Вы',
  //     lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     time: '10:49'
  //   }),
  //   new ChatList('li', {
  //     attr: {
  //       class: 'chat-list'
  //     },
  //     avatar: '/profile.jpg',
  //     chatName: 'Илья',
  //     you: 'Вы',
  //     lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     time: '10:49'
  //   }),
  //   new ChatList('li', {
  //     attr: {
  //       class: 'chat-list'
  //     },
  //     avatar: '/profile.jpg',
  //     chatName: 'Lorem ipsum',
  //     lastMessage:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     time: '10:49'
  //   })
  // ],
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
    page: 'profile'
  })
  // events: {
  //   click: (e: Event) => {
  //     // if (e.target.getAttribute('dataclick') === 'avatar') {
  //     //   profilePage.setProps({
  //     //     name1: 'ololo'
  //     //   });
  //     // }
  //     console.log(e.target);
  //   }
  // }
});

function render(attr: number) {
  const chat = CHATS[attr];
  console.log(chat);
  chatPage.setProps({
    chosenChat: new ChatMain('section', {
      attr: {
        class: 'chat-main__messages'
      },
      avatar: chat.avatar,
      chatName: chat.chatName,
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
