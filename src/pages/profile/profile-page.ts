import template from './template';
import Block from '../../services/Block';
import Avatar from '../../components/avatar/avatar';
import ProfileLine from '../../components/profile-line/profile-line';
import ProfileEdit from '../../components/profile-edit/profile-edit';
import {
  validate,
  validateProfile,
  validateSubmit
} from '../../utils/validators';
import Button from '../../components/button/button/button';
import { connect } from '../../services/connect';
import { TStore, TProps } from '../../types';
import logoutController from '../../api/auth/logoutInterface';
import buttonBack from '../../components/button/button-back/button-back';
import changeProfile from '../../api/user/changeProfile';
import ErrorComponent from '../../components/error/error';
import { ModalPasswordComponent } from '../../components/modal/modal';
import Input from '../../components/input/input';
import changePassword from '../../api/user/changePassword';

const profileEditLines = [
  new ProfileEdit('tr', {
    caption: 'Изменить данные',
    events: {
      click: (e: Event) => {
        const target = e.target as HTMLElement;
        if ((target as HTMLElement).tagName.toLowerCase() === 'a') {
          const dataContainer = document.getElementById('settings-page');
          const isEdit = dataContainer?.getAttribute('isedited');
          if (isEdit === 'false') {
            toggleToEdit();
          }
        }
      }
    }
  }),
  new ProfileEdit('tr', {
    caption: 'Изменить пароль',
    events: {
      click: (e: Event) => {
        const target = e.target as HTMLElement;
        if ((target as HTMLElement).tagName.toLowerCase() === 'a') {
          ModalEditPassword.show();
        }
      }
    }
  }),
  new ProfileEdit('tr', {
    caption: 'Выйти из аккаунта',
    class: 'color-red',
    events: {
      click: (e: Event) => {
        const target = e.target as HTMLElement;
        if ((target as HTMLElement).tagName.toLowerCase() === 'a') {
          logoutController.logout();
        }
      }
    }
  })
];
class ProfilePage extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'container rel',
        id: 'settings-page',
        isEdited: false
      },
      buttonBack: buttonBack,
      profileEdit: profileEditLines
    });
  }
  render(): DocumentFragment {
    return this.compile(template);
  }
}

function mapUserToProps(state: TStore): TProps {
  if (state.user) {
    const user = state.user;
    const img = user.avatar;
    const finalImg = img
      ? `https://ya-praktikum.tech/api/v2/resources/${img}`
      : '/profile.png';
    return {
      attr: {
        class: 'container rel',
        id: 'settings-page',
        isEdited: false
      },
      avatar: new Avatar('div', {
        src: finalImg,
        name: user.display_name || user.first_name
      }),
      profileLine: [
        new ProfileLine('tr', {
          caption: 'Почта',
          detail: user.email,
          type: 'email',
          readonly: 'true',
          name: 'email'
        }),
        new ProfileLine('tr', {
          caption: 'Логин',
          detail: user.login,
          type: 'text',
          readonly: 'true',
          name: 'login'
        }),
        new ProfileLine('tr', {
          caption: 'Имя',
          detail: user.first_name,
          type: 'text',
          readonly: 'true',
          name: 'first_name'
        }),
        new ProfileLine('tr', {
          caption: 'Фамилия',
          detail: user.second_name,
          type: 'text',
          readonly: 'true',
          name: 'second_name'
        }),
        new ProfileLine('tr', {
          caption: 'Имя в чате',
          detail: user.display_name,
          type: 'text',
          readonly: 'true',
          name: 'display_name'
        }),
        new ProfileLine('tr', {
          caption: 'Телефон',
          detail: user.phone,
          type: 'text',
          readonly: 'true',
          name: 'phone'
        })
      ],
      error: new ErrorComponent('div', {
        error: state.error.profileError || null
      })
    };
  } else {
    return {
      attr: {
        class: 'container rel error'
      }
    };
  }
}

const Connect = connect(ProfilePage, mapUserToProps);
export const profilePage = new Connect('main', {});

function toggleToEdit() {
  const inputElements = document.querySelectorAll('input');
  inputElements.forEach((input) => {
    input.removeAttribute('readonly');
    input.classList.add('changeable');
    input.addEventListener('blur', () => {
      validate(input);
    });
  });
  renderToEdit();
}

function renderToEdit() {
  profilePage.setProps({
    attr: {
      isEdited: true
    },
    profileEdit: [
      new Button('tr', {
        text: 'Сохранить',
        type: 'sumbit',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            validateProfile();
            changeProfile.changeUser('profile-form');
            toggleToProfile();
          }
        }
      })
    ]
  });
}

function toggleToProfile() {
  const inputElements = document.querySelectorAll('input');
  inputElements.forEach((input) => {
    input.setAttribute('readonly', '');
    input.classList.remove('changeable');
    input.removeEventListener('blur', () => {
      validate(input);
    });
  });
  renderToProfile();
}

function renderToProfile() {
  profilePage.setProps({
    attr: {
      isEdited: false
    },
    profileEdit: profileEditLines
  });
}

export const ModalEditPassword = new ModalPasswordComponent('div', {
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
    click: (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button') {
        const valid = validateSubmit('modal-password__form');
        if (valid) {
          changePassword.changePassword('modal-password__form');
        }
        // validateSubmit('modal-password__form');

        // if (validateProfile()) {
        //   console.log('did  validate');
        //   // store.set({
        //   //   error: { modalPasswordError: 'Поля заполнены неверно' }
        //   // });
        // }
      }
    }
  }
});
