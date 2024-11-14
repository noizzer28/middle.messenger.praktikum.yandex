import Block from '../../services/Block';
import template from './template';
import './chat-main.scss';
class ChatMain extends Block {
  render() {
    return this.compile(template);
  }
}

export default ChatMain;
