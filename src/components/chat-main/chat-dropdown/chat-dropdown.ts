import Block from '../../../services/Block';
import template from './template';
import '../chat-header/chat-header.scss';
import { TProps } from '../../../types';
import { SearchDeleteResponse } from '../../../api/types';
import { ModalAddUser } from '../../modal/modalAddUser';
import { ModalDeleteChat } from '../../modal/modalDeleteChat';
import getChatUsers from '../../../api/chats/getChatUsers';
import { ModalDeletedSearch } from '../../modal/modalDeletedSearch';
class ChatDropDown extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, propsAndChilds);
    this.addModalEvents();
  }
  render() {
    return this.compile(template);
  }
  async addModalEvents() {
    const liList = this.getContent().querySelectorAll('li');
    if (liList) {
      liList.forEach((li) => {
        if (li.dataset.add == 'adduser') {
          console.log('open add');
          li.addEventListener('click', () => {
            const modalAddUser = new ModalAddUser('div', {});
            modalAddUser.show();
          });
        }
        if (li.dataset.add == 'deleteuser') {
          li.addEventListener('click', async () => {
            console.log('open');
            try {
              const data =
                (await this.getUsersInfo()) as SearchDeleteResponse[];
              const searched = data.map((user) => {
                return `<li id=${user.id}><strong>Логин:</strong> ${user.login}, <strong>Имя:</strong> ${user.first_name}</li>`;
              });
              console.log(searched);
              const modalDeletedSearch = new ModalDeletedSearch('div', {
                body: `<ul id="searched-list">${searched.join('')}<ul>`
              });
              modalDeletedSearch.show();
              modalDeletedSearch.addListener();
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            }
          });
        }
        if (li.dataset.add == 'deletechat') {
          li.addEventListener('click', () => {
            // modalDeleteUser.show();
            const modalDeleteChat = new ModalDeleteChat('div', {});
            modalDeleteChat.show();
          });
        }
      });
    }
  }

  async getUsersInfo() {
    try {
      const resp = await getChatUsers.getUsers();
      return resp;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
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
