import template from './template';
import Block from '../../services/Block';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';
import * as Validate from '../../utils/regexp';

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
      autocomplete: 'login',
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
  button: new Button('div', {
    text: 'Войти',
    events: {
      click: (event: Event) => {
        event.preventDefault();
        validateSubmit();
      }
    }
  }),
  secondButton: new SecondaryButton('div', {
    text: 'Нет аккаунта?',
    page: 'registration'
  })
});

function validateSubmit() {
  const form = document.getElementById('login-form') as HTMLFormElement;
  const formData = new FormData(form);
  const formObject: Record<string, string> = {};
  formData.forEach((value, key) => {
    formObject[key] = value.toString();
  });

  validateLogin();

  validatePassword();

  console.log(formObject);
}

function validateLogin() {
  const target = document.getElementById('login');
  if (target instanceof HTMLInputElement) {
    if (!Validate.validateLogin(target.value)) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  } else {
    throw new Error('Элемент с id="login" не является <input>');
  }
}

function validatePassword() {
  const target = document.getElementById('password');
  if (target instanceof HTMLInputElement) {
    if (!Validate.validatePassword(target.value)) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  } else {
    throw new Error('Элемент с id="password" не является <input>');
  }
}
