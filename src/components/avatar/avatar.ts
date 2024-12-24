import './avatar.scss';
import template from './template';
import Block from '../../services/Block';
import Modal from '../modal/modal';

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

const modalAddAvatar = new Modal({
  title: 'Загрузите файл',
  text: `<input type="file" accept="image/png, image/jpeg" />`,
  buttontext: 'Поменять'
});
