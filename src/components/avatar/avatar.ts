import './avatar.scss';
import template from './template';
import Block from '../../services/Block';
import { ModalAvatar } from '../modal/modalAvatar';
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
      const modalAvatar = new ModalAvatar('div', {});
      modalAvatar.show();
    });
  }
}
export default Avatar;
