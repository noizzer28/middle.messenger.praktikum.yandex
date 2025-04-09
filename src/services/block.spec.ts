/* eslint-disable @typescript-eslint/no-unused-expressions */
import Block from './Block';
import { expect } from 'chai';
import { TProps } from '../types';
import sinon from 'sinon';

describe('Block', () => {
  let PageComponent;

  before(() => {
    class Page extends Block {
      constructor(props: TProps) {
        super('div', props);
      }

      render() {
        return this.compile(
          "<span id='test-text'>{{text}}</span><button id='test-button'>{{textBtn}}</button>"
        );
      }
    }
    PageComponent = Page;
  });

  it('should create component with correct props', () => {
    const text = 'Hello';

    const pageComp = new PageComponent({ text: text });

    const spanText = pageComp.element?.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('should assign attributes to the component correctly', () => {
    const attr = {
      id: 'test-id'
    };

    const pageComp = new PageComponent({ attr });
    const testAttr = pageComp.element?.getAttribute('id');

    expect(testAttr).to.be.eq(attr.id);
  });

  it('should renew component props and rerender', () => {
    const pageComp = new PageComponent({ text: 'Hello' });

    const newProp = 'New text';

    pageComp.setProps({ text: newProp });
    const spanText = pageComp.element?.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(newProp);
  });

  it('should set an event on a component', () => {
    const stubHandler = sinon.stub();
    const pageComp = new PageComponent({
      events: {
        click: stubHandler
      }
    });
    pageComp.element?.dispatchEvent(new MouseEvent('click'));
    expect(stubHandler.calledOnce).to.be.true;
  });

  it('should remove event listeners when unmounted', () => {
    const stubHandler = sinon.stub();
    const pageComp = new PageComponent({
      events: { click: stubHandler }
    });

    pageComp.componentDidUnmount();

    pageComp.element?.dispatchEvent(new MouseEvent('click'));

    expect(stubHandler.called).to.be.false;
  });
  it('should check if the element is hidden', () => {
    const pageComp = new PageComponent();

    pageComp.hide();

    expect(pageComp.element?.style.display).to.equal('none');
  });
});
