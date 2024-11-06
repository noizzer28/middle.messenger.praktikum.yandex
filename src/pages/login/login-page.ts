import template from './template';
import Block from '../../services/Block';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';

class LoginPage extends Block {
  render() {
    return this.compile(template);
  }
}

export const loginPage = new LoginPage('main', {
  attr: {
    class: 'container'
  },
  items: [
    new Input('div', {
      type: 'input',
      label: 'Логин',
      name: 'login',
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
    })
  ],
  button: new Button('div', { text: 'Войти' }),
  secondButton: new SecondaryButton('div', {
    text: 'Нет аккаунта?',
    page: 'registration'
  })
});
