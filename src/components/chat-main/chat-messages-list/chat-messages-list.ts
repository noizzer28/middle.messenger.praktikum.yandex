import template from './template';
import Block from '../../../services/Block';
import { TProps } from '../../../types';

class ChatMessagesList extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds
    });
  }
  render() {
    return this.compile(template);
  }
}

export default ChatMessagesList;
