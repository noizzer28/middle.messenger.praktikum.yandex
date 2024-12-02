import Block from '../../services/Block';
import template from './template';
import './modal.scss';

class Modal extends Block {
  render() {
    return this.compile(template);
  }
}

export default Modal;
