import './avatar.scss';
import template from './template';
import Block from '../../services/Block';

class Avatar extends Block {
  render() {
    return this.compile(template);
  }
}
export default Avatar;
