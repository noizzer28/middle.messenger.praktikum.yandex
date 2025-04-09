/* eslint-disable @typescript-eslint/no-unused-expressions */
import EventBus from './EventBus';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Event Bus', () => {
  const FLOW = 'test-flow';
  let eventsBus: EventBus;

  beforeEach(() => {
    eventsBus = new EventBus();
  });

  it('should trigger correct handler on emit ', () => {
    const eventHandler = sinon.stub();
    eventsBus.on(FLOW, eventHandler);
    eventsBus.emit(FLOW, 'test-data');
    expect(eventHandler.calledWith('test-data')).to.be.true;
  });

  it('should call "on" method when subscribing to an event', () => {
    const spyOn = sinon.spy(eventsBus, 'on');
    const testHandler = sinon.stub();

    eventsBus.on(FLOW, testHandler);

    expect(spyOn.calledOnce).to.be.true;

    spyOn.restore();
  });

  it('should throw an error if unsubscribed', () => {
    const spyOn = sinon.spy(eventsBus, 'off');
    const testHandler = sinon.stub();

    expect(() => eventsBus.off(FLOW, testHandler)).to.throw(
      `Нет события: ${FLOW}`
    );

    expect(spyOn.calledOnce).to.be.true;
    spyOn.restore();
  });
  it('should log "No event yet" if the event does not exist', () => {
    const consoleStub = sinon.stub(console, 'log');

    eventsBus.emit(FLOW);

    expect(consoleStub.calledOnceWithExactly('No event yet')).to.be.true;

    consoleStub.restore();
  });
});
