import { Modal } from './modal';
import { TProps } from './../../types';
import addUsertoChat from './../../api/chats/addUsertoChat';

export class ModalSearched extends Modal {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      title: 'Найдены пользователи',
      buttontext: 'Добавить',
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
        const resp = await addUsertoChat.addUser(Number(id));
        if (resp === 'OK') {
          this.setProps({
            success: 'Пользователь успешно добавлен',
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
        if (target.tagName === 'LI') {
          ulElement.querySelectorAll('li').forEach((li) => {
            li.classList.remove('selected');
          });
          this.addSelected(target);
        }
      });
    }
  }
  addSelected(element: HTMLElement) {
    element.classList.add('selected');
  }

  //   private handleSearchUser = async (login: string) => {
  //     try {
  //       const response = (await searchUser.searchUser(login)) as [];
  //       this.processSearchResponse(response);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         this.setProps({
  //           error: error.message,
  //           success: null
  //         });
  //         throw new Error(`Ошибка поиска: ${error.message || error}`);
  //       }
  //     }
  //   };

  //   private processSearchResponse = (response: SearchResponse[]) => {
  //     if (response?.length === 0) {
  //       this.setProps({
  //         error: 'Пользователь не найден',
  //         success: null
  //       });
  //     } else {
  //       const searchedUserId = response[0]?.id;
  //       this.handleDeleteUser(searchedUserId);
  //     }
  //   };

  //   private handleDeleteUser = async (id: number) => {
  //     try {
  //       const response = await deleteUserfromChat.deleteUser(id);
  //       console.log(response);
  //       if (response === 'OK') {
  //         this.setProps({
  //           success: 'Пользователь успешно удален',
  //           error: null
  //         });
  //         setTimeout(() => this.hide(), 3000);
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         this.setProps({
  //           error: `Пользователя нет в чате: ${error.message}`,
  //           success: null
  //         });
  //         throw new Error(`Пользователя нет в чате: ${error.message}`);
  //       }
  //     }
  //   };

  //   private handleError = (error: unknown) => {
  //     if (error instanceof Error) {
  //       this.setProps({
  //         error: error?.message || error,
  //         success: null
  //       });
  //     }
  //   };
}
