import './chat.scss';
import template from './template';
import Block from '../../services/Block';

class ChatList extends Block {
  render() {
    return this.compile(template);
  }
}

export default ChatList;
