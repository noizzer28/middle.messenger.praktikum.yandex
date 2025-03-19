import Block from '../../services/Block';
import template from './template';
import { TProps } from '../../types';

class Eye extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, propsAndChilds);
  }
  render() {
    return this.compile(template);
  }
}

export const eyeInput = new Eye('div', {
  attr: {
    class: 'input-eye',
    opened: false
  },
  opened: false,
  events: {
    click: (e: Event) => {
      const target = e.target as HTMLElement;
      const parentDiv = target.closest('[opened]');
      const openedState = parentDiv?.getAttribute('opened');
      const inputWrapper = parentDiv?.closest('.input-wrapper');
      const input = inputWrapper?.querySelector('input');
      if (openedState === 'true') {
        render('false');
        input?.setAttribute('type', 'password');
      } else {
        render('true');
        input?.setAttribute('type', 'text');
      }
    }
  }
});

function render(state: string) {
  eyeInput.setProps({
    attr: {
      class: 'input-eye',
      opened: state
    },
    opened: state === 'false' ? null : state
  });
}
