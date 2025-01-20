import Block from '../../services/Block';
import template from './template';
import './modal.scss';
import { TProps, TEvents, TStore } from '../../types';
import { connect } from '../../services/connect';
import ErrorComponent from '../error/error';

export class Modal extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: `modal-overlay`,
        'data-action': 'close',
        id: 'open-modal'
      },
      error: null,
      success: null
      // events: {
      //   click: (e: Event) => {
      //     e.preventDefault();
      //     const target = e.target as HTMLElement;

      //     if (target.dataset.action === 'close') {
      //       this.hide();
      //     }
      //   }
      // }
    });
    this.handleClick();
  }
  handleClick() {
    this.getContent().addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.dataset.action === 'close') {
        // store.set({ modal: { visible: false } });
        this.hide();
      }

      // if (target.dataset.action === 'confirm') {
      //   console.log(props.events);
      // }
    });
  }
  show() {
    // this.init(this.getProps());
    const mainEl = document.querySelector('main');
    mainEl?.appendChild(this.getContent());
    this.getContent().classList.add('visible');
    // return this.compile(template);
  }

  hide() {
    const mainEl = document.querySelector('main');
    mainEl?.removeChild(this.getContent());
    this.getContent()?.classList.remove('visible');
  }

  // destroy() {
  //   // const mainEl = document.querySelector('main');
  //   // if (mainEl?.contains(this.getContent())) {
  //   //   mainEl.removeChild(this.getContent());
  //   // }
  //   this.componentDidUnmount();
  // }

  render() {
    return this.compile(template);
  }
}

function mapModalPasswordProps(state: TStore) {
  return {
    error: new ErrorComponent('div', {
      error: state.error?.modalPasswordError || null
    }),
    success: state.success?.modalSuccess || null
  };
}
function mapModalAvatarProps(state: TStore) {
  return {
    error: new ErrorComponent('div', {
      error: state.error?.modalAvatarError || null
    })
  };
}

export const ModalPasswordComponent = connect(Modal, mapModalPasswordProps);
export const ModalAvatarComponent = connect(Modal, mapModalAvatarProps);
