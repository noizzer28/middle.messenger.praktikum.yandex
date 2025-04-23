import template from './template';
import Block from '../../services/Block';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';
import { validate, validateSubmit } from '../../utils/validators';
import loginController from '../../api/auth/loginUserInterface';
import { TProps, TStore } from '../../types';
import ErrorComponent from '../../components/error/error';
import { connect } from '../../services/connect';
import { eyeInput } from '../../components/eye/eye';

class LoginPage extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'container'
      },
      items: [
        new Input('div', {
          type: 'input',
          label: 'Логин',
          name: 'login',
          autocomplete: 'off',
          attr: {
            class: 'input-wrapper'
          },
          events: {
            blur: (event: Event) => {
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
          eye: eyeInput,
          attr: {
            class: 'input-wrapper rel'
          },
          events: {
            blur: (event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                validate(event.target);
              }
            }
          }
        })
      ],
      button: new Button('div', {
        text: 'Войти',
        events: {
          click: (event: Event) => {
            event.preventDefault();
            validateSubmit('login-form');
            loginController.login('login-form');
          }
        }
      }),
      secondButton: new SecondaryButton('div', {
        text: 'Нет аккаунта?',
        page: '/sign-up'
      }),
      error: null
    });
  }
  render() {
    return this.compile(template);
  }
}

function mapLoginPageProps(store: TStore): TProps {
  return {
    error: new ErrorComponent('div', {
      error: store.error.authError || null
    })
  };
}

const Connect = connect(LoginPage, mapLoginPageProps);
export const loginPage = new Connect('main', {});
