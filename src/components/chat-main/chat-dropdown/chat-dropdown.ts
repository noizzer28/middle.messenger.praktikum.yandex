import Block from '../../../services/Block';
import template from './template';
import '../chat-header/chat-header.scss';
import { TProps } from '../../../types';
import { ModalDeleteUser } from '../../modal/modalDeleteUser';
import { ModalAddUser } from '../../modal/modalAddUser';
class ChatDropDown extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, propsAndChilds);
    this.addModalEvents();
  }
  render() {
    return this.compile(template);
  }
  addModalEvents() {
    const liList = this.getContent().querySelectorAll('li');
    if (liList) {
      liList.forEach((li) => {
        if (li.dataset.add == 'adduser') {
          li.addEventListener('click', () => {
            const modalAddUser = new ModalAddUser('div', {});
            modalAddUser.show();
          });
        }
        if (li.dataset.add == 'deleteuser') {
          li.addEventListener('click', () => {
            // modalDeleteUser.show();
            const modalDelete = new ModalDeleteUser('div', {});
            modalDelete.show();
          });
        }
      });
    }
  }
}

const chatDropdown = new ChatDropDown('div', {
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
export default chatDropdown;
