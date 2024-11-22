import './avatar.scss';
import template from './template';
import Block from '../../services/Block';

interface AvatarProps {
  attr: {
    class: string;
  };
  src: string;
  name: string;
}

class Avatar extends Block {
  constructor(tagName: string = 'div', propsAndChilds: AvatarProps) {
    super(tagName, propsAndChilds);
  }
  render(): DocumentFragment {
    return this.compile(template);
  }
}
export default Avatar;
