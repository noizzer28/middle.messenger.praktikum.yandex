import template from './template';
import Block from '../../services/Block';
import Input from '../../components/input/input';
import Button from '../../components/button/button/button';
import SecondaryButton from '../../components/button/secondary-button/secondary-button';
import { validators, ValidatorMap } from '../../utils/validators';

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
  const inputElements = document.querySelectorAll('input');

  inputElements.forEach((input) => {
    validate(input);
  });
  console.log(formObject);
}

function validate(target: HTMLInputElement) {
  const name = target.getAttribute('name') as keyof ValidatorMap;
  const parent = target.parentElement;
  const value = target.value;
  if (name) {
    const validation = validators[name](value);
    if (validation) {
      addError(name, parent!, validation);
    } else {
      removeError(parent!);
    }
  }
}
function addError(name: string, parent: HTMLElement, validation: string) {
  const errorChild = parent.querySelector('[data-error]');
  if (!errorChild) {
    const errorEl = document.createElement('div');
    errorEl.setAttribute('data-error', `error-${name}`);
    errorEl.classList.add('error');
    errorEl.textContent = validation;
    parent.appendChild(errorEl);
  } else {
    errorChild.textContent = validation;
  }
}

function removeError(parent: HTMLElement) {
  const errorChild = parent.querySelector('[data-error]');
  if (errorChild) {
    parent.removeChild(errorChild);
  }
}
