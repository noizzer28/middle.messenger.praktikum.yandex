import '../button.scss';
import template from './template';
import Block from '../../../services/Block';

class Button extends Block {
  render() {
    return this.compile(template);
  }
}
export default Button;
