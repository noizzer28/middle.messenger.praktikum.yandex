import Block from '../../services/Block';
import template from './template';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';
import { validate, validateSubmit } from '../../utils/validators';
import { eyeInput } from '../../components/eye/eye';
import сreateUserController from '../../api/auth/createUserInterface';

class RegPage extends Block {
  render() {
    // console.log('render registration');
    return this.compile(template);
  }
}

export const registerPage = new RegPage('main', {
  attr: {
    class: 'container'
  },
  inputs: [
    new Input('div', {
      type: 'email',
      label: 'Почта',
      name: 'email',
      autocomplete: 'email',
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
    new Input('div', {
      type: 'input',
      label: 'Логин',
      name: 'login',
      autocomplete: 'off',
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
    new Input('div', {
      type: 'text',
      label: 'Имя',
      name: 'first_name',
      autocomplete: 'first_name',
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
    new Input('div', {
      type: 'text',
      label: 'Фамилия',
      name: 'second_name',
      autocomplete: 'second_name',
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
    new Input('div', {
      type: 'number',
      label: 'Телефон',
      name: 'phone',
      autocomplete: 'phone',
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
    new Input('div', {
      type: 'password',
      label: 'Пароль',
      name: 'password',
      autocomplete: 'off',
      eye: eyeInput,
      attr: {
        class: 'input-wrapper rel'
      },
      events: {
        blur: (event) => {
          if (event.target instanceof HTMLInputElement) {
            validate(event.target);
          }
        }
      }
    }),
    new Input('div', {
      type: 'password',
      label: 'Повторите пароль',
      name: 'rep_password',
      autocomplete: 'off',
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
    })
  ],
  button: new Button('div', {
    text: 'Зарегистрироваться',
    events: {
      click: (event: Event) => {
        event.preventDefault();
        сreateUserController.login(`regForm`);
      }
    }
  }),
  secondaryButton: new SecondaryButton('div', {
    text: 'Уже есть аккаунт?',
    page: '/'
  })
});
