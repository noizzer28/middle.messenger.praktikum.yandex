import { Modal } from './modal';
import Input from '../input/input';
import searchUser from '../../api/user/searchUser';
import { TProps } from '../../types';
import { SearchResponse } from '../../api/types';
import { ModalSearched } from './modalSearchedUsers';
import { validate } from '../../utils/validators';

export class ModalAddUser extends Modal {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      title: 'Добавить пользователя',
      body: new Input('div', {
        type: 'text',
        label: 'Логин пользователя',
        name: 'login',
        attr: { class: 'input-wrapper' },
        events: {
          blur: (event) => this.handleBlur(event)
        }
      }),
      buttontext: 'Добавить',
      events: {
        click: (e: Event) => this.handleSubmit(e)
      }
    });
  }

  private handleBlur = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      validate(event.target);
    }
  };

  private handleSubmit = async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const input = document.getElementById('login') as HTMLInputElement;
    if (!validate(input)) {
      return;
    }

    if (target.tagName.toLowerCase() === 'button') {
      try {
        const input = document.getElementById('login') as HTMLInputElement;
        const value = input.value.trim();

        if (value) {
          await this.handleSearchUser(value);
        }
      } catch (error: unknown) {
        this.handleError(error);
      }
    }
  };

  private handleSearchUser = async (login: string) => {
    try {
      const response = (await searchUser.searchUser(login)) as [];
      this.processSearchResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        this.setProps({
          error: error.message,
          success: null
        });
        throw new Error(`Ошибка поиска: ${error.message || error}`);
      }
    }
  };

  private processSearchResponse = (response: SearchResponse[]) => {
    if (response?.length === 0) {
      this.setProps({
        error: 'Пользователи не найдены',
        success: null
      });
    } else {
      this.handleAddUser(response);
    }
  };

  private handleAddUser = async (response: SearchResponse[]) => {
    const searched = response.map((user) => {
      return `<li id=${user.id}><strong>Логин:</strong> ${user.login}, <strong>Имя:</strong> ${user.first_name}</li>`;
    });
    const modalSearchedUsers = new ModalSearched('div', {
      body: `<ul id="searched-list">${searched.join('')}<ul>`
    });
    this.hide();
    modalSearchedUsers.show();
    modalSearchedUsers.addListener();
    // try {
    //   const response = await addUsertoChat.addUser(id);
    //   console.log(response);
    //   if (response === 'OK') {
    //     this.setProps({
    //       success: 'Пользователь успешно добавлен',
    //       error: null
    //     });
    //     setTimeout(() => this.hide(), 3000);
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     this.setProps({
    //       error: `Ошибка: ${error.message}`,
    //       success: null
    //     });
    //     throw new Error(`Ошибка: ${error.message}`);
    //   }
    // }
  };

  private handleError = (error: unknown) => {
    if (error instanceof Error) {
      this.setProps({
        error: error?.message || error,
        success: null
      });
    }
  };
}
