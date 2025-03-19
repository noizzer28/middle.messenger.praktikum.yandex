import template from './template';
import Block from '../../services/Block';
import './input.scss';
import { TProps, TEvents } from './../../types';

class Input extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, propsAndChilds);
    this.addInputEvents(propsAndChilds);
  }
  render() {
    return this.compile(template);
  }
  addInputEvents(props: TProps) {
    const inputElement = this.getContent().querySelector('input');
    if (inputElement) {
      if (props.events) {
        const events = props.events as TEvents;
        Object.entries(events).forEach(([key, handler]) => {
          if (handler) {
            inputElement.addEventListener(key, handler as EventListener);
          }
        });
      }
    }
  }
}
export default Input;
