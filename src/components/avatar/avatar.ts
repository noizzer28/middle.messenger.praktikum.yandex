import './avatar.scss';
import template from './template';
import Block from '../../services/Block';
import ModalComponent from '../modal/modal';
import changeAvatar from '../../api/user/changeAvatar';
import ErrorComponent from '../error/error';
import { connect } from '../../services/connect';
import { TStore } from '../../types';
import store from '../../services/Store';
interface AvatarProps {
  src: string;
  name: string;
}

class Avatar extends Block {
  constructor(tagName: string = 'div', propsAndChilds: AvatarProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: `avatar-wrapper`
      }
    });
    this.addModalEvents();
  }
  render(): DocumentFragment {
    return this.compile(template);
  }
  addModalEvents() {
    const avatarOpen = this.getContent().querySelector('.avatar-shadow');
    avatarOpen?.addEventListener('click', () => {
      modalAddAvatar.show();
    });
  }
}
export default Avatar;

export const modalAddAvatar = new ModalComponent('div', {
  title: 'Загрузите файл',
  body: `<input type="file" accept="image/jpeg, image/png, image/gif, image/webp" id="avatar-input" />`,
  buttontext: 'Поменять',
  events: {
    click: (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button') {
        const input = document.getElementById(
          'avatar-input'
        ) as HTMLInputElement;
        const file = input?.files?.[0] as File;
        changeAvatar.changeAvatar(file);
      }
    }
  }
});
