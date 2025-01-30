import { Modal } from './modal';
import { TProps } from '../../types';
import changeAvatar from '../../api/user/changeAvatar';
import Input from '../input/input';

export class ModalAvatar extends Modal {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      title: 'Загрузите файл',
      body: new Input('div', {
        type: 'file',
        accept: 'image/jpeg, image/png, image/gif, image/webp',
        name: 'avatar-input'
      }),
      buttontext: 'Поменять',
      events: {
        click: (e: Event) => this.handleSubmit(e)
      }
    });
  }

  private handleSubmit = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'button') {
      e.preventDefault();
      const input = document.getElementById('avatar-input') as HTMLInputElement;
      const file = input?.files?.[0] as File;
      if (file) {
        this.handleChangeAvatar(file);
      } else {
        this.setProps({ error: 'Выберите файл' });
      }
    }
  };

  private handleChangeAvatar = async (file: File) => {
    try {
      await changeAvatar.changeAvatar(file);
      this.setProps({ error: null, success: 'Аватар успешно загружен' });
      setTimeout(() => {
        this.hide();
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        this.setProps({
          error: error.message,
          success: null
        });
        throw new Error(`Ошибка: ${error.message || error}`);
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
