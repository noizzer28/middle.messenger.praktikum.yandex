import template from './template';
import Block from '../../services/Block';
import ButtonBack from '../../components/button/button-back/button-back';
import Avatar from '../../components/avatar/avatar';
import ProfileLine from '../../components/profile-line/profile-line';
import ProfileEdit from '../../components/profile-edit/profile-edit';
import { validate, validateProfile } from '../../utils/validators';
import Button from '../../components/button/button/button';
import store, { StoreEvents } from '../../services/Store';
import { connect } from '../../services/connect';
import { TStore, TProps } from '../../types';
import logoutController from '../../api/auth/logoutInterface';

class ProfilePage extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    console.log(propsAndChilds);
    super('main', {
      ...propsAndChilds
    });
    // store.on(StoreEvents.Updated, () => {
    //   this.setProps({ ...store.getState() });
    //   // console.log(store.getState());
    //   // console.log('after', propsAndChilds);
    // });
    // console.log(propsAndChilds);
  }
  render(): DocumentFragment {
    return this.compile(template);
  }
}
function mapUserToProps(state: TStore) {
  if (state.user) {
    return {
      first_name: state.user.first_name,
      avatar: state.user.avatar,
      second_name: state.user.second_name,
      display_name: state.user.display_name,
      phone: state.user.phone,
      email: state.user.email
    };
  }
}

const ConnectedProfile = connect(mapUserToProps)(ProfilePage);
// console.log(ConnectedProfile);
// console.log(ProfilePage);
const profileEditLines = [
  new ProfileEdit('tr', {
    attr: {
      class: 'table-edit'
    },
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
    attr: {
      class: 'table-edit'
    },
    caption: 'Изменить пароль'
  }),
  new ProfileEdit('tr', {
    attr: {
      class: 'table-edit'
    },
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

export const profilePage = new ConnectedProfile('main', {
  attr: {
    class: 'container rel',
    id: 'settings-page',
    isEdited: false
  },
  buttonBack: new ButtonBack('div', {
    attr: {
      class: 'button-back',
      page: '/messenger'
    },
    page: '/messenger'
  }),
  avatar: new Avatar('div', {
    attr: {
      class: `avatar-wrapper`
    },
    src: '/profile.png',
    name: 'Noizzer'
  }),
  profileLine: [
    new ProfileLine('tr', {
      caption: 'Почта',
      detail: '',
      type: 'email',
      readonly: 'true',
      name: 'email'
    }),
    new ProfileLine('tr', {
      caption: 'Логин',
      detail: 'noizzer11',
      type: 'text',
      readonly: 'true',
      name: 'login'
    }),
    new ProfileLine('tr', {
      caption: 'Имя',
      detail: 'Victoria',
      type: 'text',
      readonly: 'true',
      name: 'first-name'
    }),
    new ProfileLine('tr', {
      caption: 'Фамилия',
      detail: 'Noname',
      type: 'text',
      readonly: 'true',
      name: 'second-name'
    }),
    new ProfileLine('tr', {
      caption: 'Имя в чате',
      detail: 'noizzer',
      type: 'text',
      readonly: 'true',
      name: 'display-name'
    }),
    new ProfileLine('tr', {
      caption: 'Телефон',
      detail: '+7 (900) 000-00-00',
      type: 'text',
      readonly: 'true',
      name: 'phone'
    })
  ],
  profileEdit: profileEditLines
});

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
      class: 'container',
      id: 'settings-page',
      isEdited: true
    },
    profileEdit: [
      new Button('tr', {
        text: 'Сохранить',
        events: {
          click: () => {
            toggleToProfile();
          }
        }
      })
    ]
  });
}

function toggleToProfile() {
  validateProfile();
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
  rofilePage.setProps({
    attr: {
      class: 'container',
      id: 'settings-page',
      isEdited: false
    },
    profileEdit: profileEditLines
  });
}
