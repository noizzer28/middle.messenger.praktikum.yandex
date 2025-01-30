import './search.scss';
import template from './template';
import Block from '../../services/Block';
import createChat from '../../api/chats/createChat';
import { TProps } from '../../types';

class Search extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'chat-header'
      },
      page: '/settings'
    });
    this.handleClick();
  }
  handleClick() {
    this.getContent().addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.dataset.action === 'create-chat') {
        const input = document.getElementById(
          'create-chat-input'
        ) as HTMLInputElement;
        if (input) {
          createChat.create(input);
        }
      }
    });
  }
  render() {
    return this.compile(template);
  }
}

const search = new Search('header', {});
export default search;
