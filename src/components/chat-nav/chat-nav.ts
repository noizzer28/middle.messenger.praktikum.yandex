import Block from '../../services/Block';
import template from './template';
import '../chat-header/chat-header.scss';
import { TProps } from '@/types';
// import Modal from '../modal/modal';

class ChatNav extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, propsAndChilds);
    // this.addDropdownEvents();
  }
  render() {
    return this.compile(template);
  }

  // addDropdownEvents() {
  //   const listItems = this.getContent().querySelectorAll('li');
  //   listItems.forEach((item) => {
  //     item.addEventListener('click', () => {
  //       this.setProps({
  //         modalBlock: new Modal('div')
  //       });
  //     });
  //   });
  // }
}

export const chatNav = new ChatNav('div', {
  attr: {
    class: `chat-main__header-svg`
  },
  events: {
    click: (e: Event) => {
      e.stopPropagation();
      const nav = document.getElementById('chat-nav');
      if (nav) {
        nav.classList.add('visible');
        setTimeout(() => {
          hideNav(nav);
        }, 100);
      }
    }
  }
});

function hideNav(dropdownContainer: HTMLElement) {
  document.addEventListener('click', handleClickOutside);

  function handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!dropdownContainer.contains(target)) {
      dropdownContainer.classList.remove('visible');
      document.removeEventListener('click', handleClickOutside);
    }
  }
}
