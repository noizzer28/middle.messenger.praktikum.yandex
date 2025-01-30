import { Modal } from './modal';
import { TProps } from '../../types';
import changeAvatar from '../../api/user/changeAvatar';
import Input from '../input/input';
import { validate, validateSubmit } from '../../utils/validators';
import changePassword from '../../api/user/changePassword';
import { ChangeUserPassword } from '../../api/types';

export class ModalPassword extends Modal {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      title: 'Изменить пароль',
      form_id: 'modal-password__form',
      success: null,
      body: new Input('div', {
        type: 'text',
        label: 'Старый пароль',
        name: 'not_required',
        autocomplete: 'password',
        attr: {
          class: 'input-wrapper'
        }
      }),
      body_2: new Input('div', {
        type: 'text',
        label: 'Новый пароль',
        name: 'password',
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
      body_3: new Input('div', {
        type: 'text',
        label: 'Повторите пароль',
        name: 'rep_password',
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
      buttontext: 'Поменять',
      events: {
        click: (e: Event) => this.handleSubmit(e)
      }
    });
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'button') {
      if (!validateSubmit('modal-password__form')) {
        this.setProps({ error: 'Заполните все поля' });
        return;
      } else {
        const data = this.collectData('modal-password__form');
        this.handleChangePassword(data);
      }
    }
  };

  private collectData(id: string) {
    const form = document.getElementById(id) as HTMLFormElement;
    if (!form || !(form instanceof HTMLFormElement)) {
      throw new Error('Форма не найдена или не является HTMLFormElement');
    }
    const inputs = form?.querySelectorAll('input');
    const data = {} as ChangeUserPassword;
    if (inputs) {
      data.oldPassword = inputs[0].value.trim();
      data.newPassword = inputs[1].value.trim();
    }
    return data;
  }

  private handleChangePassword = async (data: ChangeUserPassword) => {
    try {
      await changePassword.changePassword(data);
      this.setProps({ error: null, success: 'Пароль успешно изменен' });
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
}
