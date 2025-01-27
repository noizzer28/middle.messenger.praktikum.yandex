import Block from '../../../services/Block';
import template from './template';
import '../chat-header/chat-header.scss';
import { TProps } from '../../../types';
import { Modal } from '../../modal/modal';
import Input from '../../input/input';
import searchUser from '../../../api/user/searchUser';
import { validate } from '../../../utils/validators';

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
            modalAddUser.show();
          });
        }
        if (li.dataset.add == 'deleteuser') {
          li.addEventListener('click', () => {
            modalDeleteUser.show();
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

export const modalAddUser = new Modal('div', {
  title: 'Добавить пользователя',
  // body: `<label>Логин</label>
  // <input class="input" type='text'/>`,
  body: new Input('div', {
    type: 'text',
    label: 'Логин пользователя',
    name: 'login',
    attr: {
      class: 'input-wrapper'
    },
    events: {
      blur: (event) => {
        if (event.target instanceof HTMLInputElement) {
          validate(event.target);
        }
      }
    }
  }),
  buttontext: 'Добавить',
  events: {
    click: (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button') {
        const input = document.getElementById('login') as HTMLInputElement;
        console.log(input);
        const value = input.value;
        if (value) {
          searchUser.searchUser(value);
        }
      }
    }
  }
});
const modalDeleteUser = new Modal('div', {
  title: 'Удалить пользователя',
  body: `<label>Логин</label>
  <input class="input" type='text'/>`,
  buttontext: 'Удалить'
});
