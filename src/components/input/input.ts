import template from './template';
import Block from '../../services/Block';
import './input.scss';

class Input extends Block {
  render() {
    return this.compile(template);
  }
}
export default Input;
