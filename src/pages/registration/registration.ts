import Block from '../../services/Block';
import template from './template';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';
import { validate, validateProfile } from '../../utils/validators';
import { eyeInput } from '../../components/eye/eye';
import сreateUserController from '../../api/auth/createUserInterface';
import { TProps, TStore } from '../../types';
import ErrorComponent from '../../components/error/error';
import { connect } from '../../services/connect';
class RegPage extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
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
            validateProfile();
            сreateUserController.login(`regForm`);
          }
        }
      }),
      secondaryButton: new SecondaryButton('div', {
        text: 'Уже есть аккаунт?',
        page: '/'
      }),
      error: null
    });
  }
  render() {
    // console.log('render registration');
    return this.compile(template);
  }
}

function mapRegisterPageProps(store: TStore): TProps {
  if (store.error?.regError) {
    return {
      error: new ErrorComponent('div', {
        error: store.error.regError
      })
    };
  } else {
    return {
      error: null
    };
  }
}

const Connect = connect(RegPage, mapRegisterPageProps);

export const registerPage = new Connect('main', {});
