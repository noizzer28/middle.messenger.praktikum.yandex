import Block from '../../services/Block';
import template from './template';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';

class RegPage extends Block {
  render() {
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
      name: 'form',
      attr: {
        class: 'input-wrapper'
      }
    }),
    new Input('div', {
      type: 'input',
      label: 'Логин',
      name: 'form',
      attr: {
        class: 'input-wrapper'
      }
    }),
    new Input('div', {
      type: 'text',
      label: 'Имя',
      name: 'name',
      attr: {
        class: 'input-wrapper'
      }
    }),
    new Input('div', {
      type: 'text',
      label: 'Фамилия',
      name: 'last-name',
      attr: {
        class: 'input-wrapper'
      }
    }),
    new Input('div', {
      type: 'number',
      label: 'Телефон',
      name: 'phone',
      attr: {
        class: 'input-wrapper'
      }
    }),
    new Input('div', {
      type: 'password',
      label: 'Пароль',
      name: 'password',
      attr: {
        class: 'input-wrapper'
      }
    }),
    new Input('div', {
      type: 'password',
      label: 'Повторите пароль',
      name: 'rep-   password',
      attr: {
        class: 'input-wrapper'
      }
    })
  ],
  button: new Button('div', { text: 'Войти' }),
  secondaryButton: new SecondaryButton('div', {
    text: 'Уже есть аккаунт?',
    page: 'login'
  })
});
