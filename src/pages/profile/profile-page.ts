import template from './template';
import Block from '../../services/Block';
import ButtonBack from '../../components/button/button-back/button-back';
import Avatar from '../../components/avatar/avatar';
import ProfileLine from '../../components/profile-line/profile-line';
import ProfileEdit from '../../components/profile-edit/profile-edit';

class ProfilePage extends Block {
  render(): DocumentFragment {
    return this.compile(template);
  }
}

export const profilePage = new ProfilePage('div', {
  name1: 'ololo',
  attr: {
    class: 'container'
  },
  buttonBack: new ButtonBack('div', {
    attr: {
      class: 'button-back',
      page: 'chat'
    },
    page: 'chat'
  }),
  avatar: new Avatar('div', {
    attr: {
      class: `avatar-wrapper`
    },
    src: '/profile.jpg',
    name: 'Noizzer'
  }),
  profileLine: [
    new ProfileLine('tr', {
      caption: 'Почта',
      detail: 'email@ya.ru',
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
      name: 'login'
    }),
    new ProfileLine('tr', {
      caption: 'Телефон',
      detail: '+7 (900) 000-00-00',
      type: 'text',
      readonly: 'true',
      name: 'phone'
    })
  ],
  profileEdit: [
    new ProfileEdit('tr', {
      attr: {
        class: 'table-edit'
      },
      caption: 'Изменить данные'
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
      class: 'color-red'
    })
  ],
  events: {
    click: (e: Event) => {
      // if (e.target.getAttribute('dataclick') === 'avatar') {
      //   profilePage.setProps({
      //     name1: 'ololo'
      //   });
      // }
      console.log(e.target);
    },
    blur: (e: Event) => {
      profilePage.setProps({
        name1: 'ololo'
      });
    }
  }
});
