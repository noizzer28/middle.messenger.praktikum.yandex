import Block from '../../services/Block';
import template from './template';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';
import * as Validate from '../../utils/regexp';

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
      name: 'email',
      autocomplete: 'email',
      attr: {
        class: 'input-wrapper'
      },
      events: {
        blur: () => {
          validateEmail();
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
        blur: () => {
          validateLogin();
        }
      }
    }),
    new Input('div', {
      type: 'text',
      label: 'Имя',
      name: 'name',
      autocomplete: 'name',
      attr: {
        class: 'input-wrapper'
      },
      events: {
        blur: () => {
          validateName();
        }
      }
    }),
    new Input('div', {
      type: 'text',
      label: 'Фамилия',
      name: 'last-name',
      autocomplete: 'last-name',
      attr: {
        class: 'input-wrapper'
      },
      events: {
        blur: () => {
          validateLastName();
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
        blur: () => {
          // const target = event.target as HTMLInputElement;
          // if (!Validate.validatePhone(target.value)) {
          //   target.classList.add('invalid');
          // } else {
          //   target.classList.remove('invalid');
          // }
          validatePhone();
        }
      }
    }),
    new Input('div', {
      type: 'password',
      label: 'Пароль',
      name: 'password',
      autocomplete: 'off',
      attr: {
        class: 'input-wrapper'
      },
      events: {
        blur: () => {
          validatePassword();
        }
      }
    }),
    new Input('div', {
      type: 'password',
      label: 'Повторите пароль',
      name: 'rep-password',
      autocomplete: 'off',
      attr: {
        class: 'input-wrapper'
      },
      events: {
        blur: () => {
          validateRepPass();
        }
      }
    })
  ],
  button: new Button('div', {
    text: 'Зарегистрироваться',
    events: {
      click: (event: Event) => {
        event.preventDefault();
        validateSubmit();
      }
    }
  }),
  secondaryButton: new SecondaryButton('div', {
    text: 'Уже есть аккаунт?',
    page: 'login'
  })
});

function validateSubmit() {
  const form = document.getElementById('regForm') as HTMLFormElement;
  const formData = new FormData(form);
  const formObject: Record<string, string> = {};
  formData.forEach((value, key) => {
    formObject[key] = value.toString();
  });
  validateEmail();
  validateLastName();
  validateLogin();
  validateName();
  validatePassword();
  validateRepPass();
  validatePhone();
  console.log(formObject);
}

function validateEmail() {
  const target = document.getElementById('email');
  if (target instanceof HTMLInputElement) {
    if (!Validate.validateEmail(target.value)) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  } else {
    throw new Error('Элемент с id="email" не является <input>');
  }
}
function validateName() {
  const target = document.getElementById('name');
  if (target instanceof HTMLInputElement) {
    if (!Validate.validateName(target.value)) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  } else {
    throw new Error('Элемент с id="name" не является <input>');
  }
}
function validateLastName() {
  const target = document.getElementById('last-name');
  if (target instanceof HTMLInputElement) {
    if (!Validate.validateName(target.value)) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  } else {
    throw new Error('Элемент с id="last name" не является <input>');
  }
}
function validatePhone() {
  const target = document.getElementById('phone');
  if (target instanceof HTMLInputElement) {
    if (!Validate.validatePhone(target.value)) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  } else {
    throw new Error('Элемент с id="phone" не является <input>');
  }
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
function validateRepPass() {
  const repPass = document.getElementById('rep-password');
  const isEqual = validatePasswords();
  if (repPass instanceof HTMLInputElement) {
    if (!Validate.validateEmail(repPass.value) && !isEqual) {
      repPass.classList.add('invalid');
    } else {
      repPass.classList.remove('invalid');
    }
  } else {
    throw new Error('Элемент с id="reppass" не является <input>');
  }
}

function validatePasswords() {
  const repPass = document.getElementById('rep-password') as HTMLInputElement;
  const pass = document.getElementById('password') as HTMLInputElement;
  return repPass.value === pass.value;
}
