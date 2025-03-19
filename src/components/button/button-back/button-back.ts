import '../button.scss';
import template from './template';
import Block from '../../../services/Block';

class ButtonBack extends Block {
  render() {
    return this.compile(template);
  }
}

const buttonBack = new ButtonBack('div', {
  attr: {
    class: 'button-back',
    page: '/messenger'
  },
  page: '/messenger'
});
export default buttonBack;
