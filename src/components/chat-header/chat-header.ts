import template from './template';
import Block from '../../services/Block';
import './chat-header.scss';

class ChatHeader extends Block {
  render() {
    return this.compile(template);
  }
}

export default ChatHeader;
