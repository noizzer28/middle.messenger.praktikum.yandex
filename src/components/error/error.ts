import template from './template';
import Block from '../../services/Block';
import './error.scss';

class ErrorComponent extends Block {
  render() {
    return this.compile(template);
  }
}

export default ErrorComponent;
