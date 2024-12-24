import '../profile-line/profile-line.scss';
import template from './template';
import Block from '../../services/Block';
import { TProps } from '../../types';

class ProfileEdit extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'table-edit'
      }
    });
  }
  render() {
    return this.compile(template);
  }
}

export default ProfileEdit;
