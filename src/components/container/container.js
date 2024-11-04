import template from './template';
import Block from '../../services/Block';
import './container.scss';

class Container extends Block {
  render() {
    return this.compile(template);
  }
}

export default Container;
