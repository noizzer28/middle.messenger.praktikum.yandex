import { Modal } from './modal';
import Input from '../input/input';
import searchUser from '../../api/user/searchUser';
import { TProps } from '../../types';
import { validate } from '../../utils/validators';
import deleteUserfromChat from '../../api/chats/deleteUserfromChat';
import { SearchResponse } from '../../api/types';

export class ModalDeleteUser extends Modal {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      title: 'Удалить пользователя',
      body: new Input('div', {
        type: 'text',
        label: 'Логин пользователя',
        name: 'login',
        attr: { class: 'input-wrapper' },
        events: {
          blur: (event) => this.handleBlur(event)
        }
      }),
      buttontext: 'Удалить',
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
        error: 'Пользователь не найден',
        success: null
      });
    } else {
      const searchedUserId = response[0]?.id;
      this.handleDeleteUser(searchedUserId);
    }
  };

  private handleDeleteUser = async (id: number) => {
    try {
      const response = await deleteUserfromChat.deleteUser(id);
      // console.log(response);
      if (response === 'OK') {
        this.setProps({
          success: 'Пользователь успешно удален',
          error: null
        });
        setTimeout(() => this.hide(), 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setProps({
          error: `Пользователя нет в чате: ${error.message}`,
          success: null
        });
        throw new Error(`Пользователя нет в чате: ${error.message}`);
      }
    }
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
