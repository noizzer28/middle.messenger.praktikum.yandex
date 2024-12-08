import Block from '../../services/Block';
import template from './template';
import './modal.scss';
import { TProps } from '@/types';

class Modal extends Block {
  props: TProps;
  constructor(props: TProps) {
    super('div', {
      ...props,
      attr: {
        class: 'modal-overlay',
        'data-action': 'close'
      },
      events: {
        click: (e: Event) => {
          this.handleClick(e);
        }
      }
    });
    this.props = props;
  }
  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.dataset.action === 'close') {
      this.hide();
    }

    if (target.dataset.action === 'confirm') {
      this.hide();
    }
  }

  show() {
    const mainEl = document.querySelector('main');
    mainEl?.appendChild(this.getContent());
    this.getContent().classList.add('visible');
  }

  hide() {
    const mainEl = document.querySelector('main');
    mainEl?.removeChild(this.getContent());
    this.getContent()?.classList.remove('visible');
  }

  render() {
    return this.compile(template);
  }
}

export default Modal;
