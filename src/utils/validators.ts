type Tvalid = (value: string) => string | null;

export type ValidatorMap = {
  first_name: Tvalid;
  second_name: Tvalid;
  login: Tvalid;
  email: Tvalid;
  password: Tvalid;
  phone: Tvalid;
  message: Tvalid;
  'rep-password': Tvalid;
  'display-name': Tvalid;
};

const validateName: Tvalid = (name) => {
  if (!name) return 'Имя не может быть пустым.';
  if (!/^[А-ЯA-Z]/.test(name))
    return 'Имя должно начинаться с заглавной буквы.';
  if (!/^[А-ЯA-Zа-яa-z-]+$/.test(name))
    return 'Имя может содержать только буквы и дефис.';
  if (/\d/.test(name)) return 'Имя не должно содержать цифры.';
  if (/\s/.test(name)) return 'Имя не должно содержать пробелы.';
  return null;
};

const validateLogin: Tvalid = (login) => {
  if (!login) return 'Логин не может быть пустым.';
  if (login.length < 3 || login.length > 20)
    return 'Логин должен быть от 3 до 20 символов.';
  if (/^\d+$/.test(login)) return 'Логин не может состоять только из цифр.';
  if (!/^[a-zA-Z0-9_-]+$/.test(login))
    return 'Логин может содержать только латиницу, цифры, дефис и нижнее подчёркивание.';
  if (/\s/.test(login)) return 'Логин не должен содержать пробелы.';
  return null;
};

const validateEmail: Tvalid = (email) => {
  if (!email) return 'Email не может быть пустым.';
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return 'Email должен быть в формате example@example.com.';
  }
  if (!/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)) {
    return 'Перед точкой в email должны быть буквы.';
  }
  return null;
};

const validatePassword: Tvalid = (password) => {
  if (!password) return 'Пароль не может быть пустым.';
  if (password.length < 8 || password.length > 40)
    return 'Пароль должен быть от 8 до 40 символов.';
  if (!/[A-Z]/.test(password))
    return 'Пароль должен содержать хотя бы одну заглавную букву.';
  if (!/\d/.test(password))
    return 'Пароль должен содержать хотя бы одну цифру.';
  return null;
};
const validateRepPassword: Tvalid = (repPass) => {
  const pass = document.getElementById('password') as HTMLInputElement;
  if (repPass !== pass.value) return 'Пароли не совпадают';
  return null;
};

const validatePhone: Tvalid = (phone) => {
  if (!phone) return 'Телефон не может быть пустым.';
  if (!/^\+?\d{10,15}$/.test(phone)) {
    return 'Телефон должен быть от 10 до 15 цифр и может начинаться с "+"';
  }
  return null;
};

const validateMessage: Tvalid = (message) => {
  if (!message.trim()) return 'Сообщение не должно быть пустым.';
  return null;
};

export function validateSubmit(id: string) {
  const form = document.getElementById(id) as HTMLFormElement;
  const formData = new FormData(form);
  const formObject: Record<string, string> = {};
  formData.forEach((value, key) => {
    formObject[key] = value.toString();
  });
  // console.log(formData, formObject);
  const inputElements = document.querySelectorAll('input');
  inputElements.forEach((input) => {
    const result = validate(input);
    if (!result) {
      throw new Error('Поля заполнены неверно ');
    }
  });
  // return Array.from(inputElements).every((input) => validate(input));
}

export function validateProfile() {
  const inputElements = document.querySelectorAll('input');
  inputElements.forEach((input) => {
    const result = validate(input);
    if (!result) {
      throw new Error('Поля заполнены неверно ');
    }
  });
  return Array.from(inputElements).every((input) => validate(input));
}

export function validate(target: HTMLInputElement) {
  const name = target.getAttribute('name') as keyof ValidatorMap;
  const parent = target.parentElement;
  const value = target.value;
  if (name) {
    const validation = validators[name](value);
    if (validation) {
      addError(name, parent!, validation);
      return false;
    } else {
      removeError(parent!);
      return true;
    }
  }
}
export function addError(
  name: string,
  parent: HTMLElement,
  validation: string
) {
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

export function removeError(parent: HTMLElement) {
  const errorChild = parent.querySelector('[data-error]');
  if (errorChild) {
    parent.removeChild(errorChild);
  }
}

export const validators: ValidatorMap = {
  first_name: validateName,
  second_name: validateName,
  login: validateLogin,
  email: validateEmail,
  password: validatePassword,
  phone: validatePhone,
  message: validateMessage,
  'rep-password': validateRepPassword,
  'display-name': validateName
};
