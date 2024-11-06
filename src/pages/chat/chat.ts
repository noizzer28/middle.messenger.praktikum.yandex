import Block from '../../services/Block';
import template from './template';
import ChatList from '../../components/chat/chat-list';
import Search from '../../components/search/search';

class ChatPage extends Block {
  render() {
    return this.compile(template);
  }
}

export const chatPage = new ChatPage('main', {
  attr: {
    class: 'chat'
  },
  chatList: [
    new ChatList('li', {
      attr: {
        class: 'chat-list'
      },
      avatar: '/profile.jpg',
      chatName: 'Lorem ipsum',
      you: 'Noizzer',
      lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '10:49'
    }),
    new ChatList('li', {
      attr: {
        class: 'chat-list'
      },
      avatar: '/profile.jpg',
      chatName: 'Lorem ipsum',
      you: 'Noizzer',
      lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '10:49'
    }),
    new ChatList('li', {
      attr: {
        class: 'chat-list'
      },
      avatar: '/profile.jpg',
      chatName: 'Lorem ipsum',
      lastMessage:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '10:49'
    })
  ],
  search: new Search('hedare', {
    attr: {
      class: 'chat-header'
    },
    page: 'login'
  })
});
