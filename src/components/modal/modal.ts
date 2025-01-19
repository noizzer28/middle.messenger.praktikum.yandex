import Block from '../../services/Block';
import template from './template';
import './modal.scss';
import { TProps, TEvents, TStore } from '../../types';
import { connect } from '../../services/connect';
import ErrorComponent from '../error/error';
import store from '../../services/Store';

class Modal extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: `modal-overlay visible`,
        'data-action': 'close',
        id: 'open-modal'
      },
      error: null
    });
    // this.addButtonEvents(propsAndChilds);
    this.handleClick();
  }
  // addButtonEvents(props: TProps) {
  //   const btn = this.getContent().querySelector('button');
  //   console.log(props);
  //   if (btn) {
  //     if (props.events) {
  //       const events = props.events as TEvents;
  //       console.log(events);
  //       Object.entries(events).forEach(([key, handler]) => {
  //         if (handler) {
  //           btn.addEventListener(key, handler as EventListener);
  //         }
  //       });
  //     }
  //   }
  // }
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

function mapModalProps(state: TStore) {
  return {
    error: new ErrorComponent('div', {
      error: state.error?.modalError || null
    })
  };
}

const ModalComponent = connect(Modal, mapModalProps);
export default ModalComponent;
