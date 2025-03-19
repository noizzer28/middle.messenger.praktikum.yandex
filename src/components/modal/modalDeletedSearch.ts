import { Modal } from './modal';
import { TProps } from './../../types';
import deleteUserfromChat from '../../api/chats/deleteUserfromChat';

export class ModalDeletedSearch extends Modal {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      title: 'Удалить пользователей',
      buttontext: 'Удалить',
      events: {
        click: (e: Event) => this.handleSubmit(e)
      }
    });
  }

  private handleSubmit = async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'button') {
      const ulElement = document.getElementById('searched-list');
      const selected = ulElement?.querySelector('.selected');
      const id = selected?.getAttribute('id');
      try {
        const resp = await deleteUserfromChat.deleteUser(Number(id));
        if (resp === 'OK') {
          this.setProps({
            success: 'Пользователь успешно удален',
            error: null
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.setProps({ success: '', error: error.message });
          throw new Error(error.message);
        }
      }
    }
  };

  addListener() {
    const ulElement = document.getElementById('searched-list');
    if (ulElement) {
      ulElement.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        const liElement = target.closest('li');

        if (liElement) {
          ulElement.querySelectorAll('li').forEach((li) => {
            li.classList.remove('selected');
          });
          this.addSelected(liElement);
        }
      });
    }
  }
  addSelected(element: HTMLElement) {
    element.classList.add('selected');
  }
}
