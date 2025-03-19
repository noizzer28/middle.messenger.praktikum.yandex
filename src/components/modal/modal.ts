import Block from '../../services/Block';
import template from './template';
import './modal.scss';
import { TProps } from '../../types';
export class Modal extends Block {
  private _isMounted = false;
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: `modal-overlay visible`,
        'data-action': 'close',
        id: 'open-modal'
      },
      error: null,
      success: null
    });
    this.handleClick();
  }
  handleClick() {
    this.getContent().addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.dataset.action === 'close') {
        this.hide();
      }
    });
  }
  show() {
    if (!this._isMounted) {
      const mainEl = document.querySelector('main');
      mainEl?.appendChild(this.getContent());
      this._isMounted = true;
    }
    this.getContent().classList.add('visible');
  }

  hide() {
    this.getContent().classList.remove('visible');
    this.destroy();
  }

  destroy() {
    this.componentDidUnmount();
  }

  render() {
    return this.compile(template);
  }
}
