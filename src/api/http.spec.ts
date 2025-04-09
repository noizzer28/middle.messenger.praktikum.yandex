/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import HTTPTransport from './HttpTransport';
import { METHODS } from '../types';
import Sinon from 'sinon';

describe('HTTPTransport', () => {
  const sandbox = sinon.createSandbox();
  let http: HTTPTransport;
  let requestStub: Sinon.SinonStub;

  beforeEach(() => {
    http = new HTTPTransport();
    requestStub = sandbox
      .stub(http, 'request' as keyof typeof http)
      .callsFake(() => Promise.resolve({}));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('GET should call request with correct parameters', () => {
    http.get('/test', { timeout: 5000 });

    expect(
      requestStub.calledWith('/test', { method: METHODS.GET }, 5000)
    ).to.equal(true);
  });

  it('POST should set the body', () => {
    const data = { login: 'test' };
    http.post('/auth', { body: data });

    expect(
      requestStub.calledWith('/auth', { method: METHODS.POST, body: data })
    ).to.equal(true);
  });

  it('PUT ырщгдв set headers', () => {
    http.put('/profile', {
      headers: { 'Content-Type': 'text/plain' }
    });

    expect(
      requestStub.calledWith('/profile', {
        method: METHODS.PUT,
        headers: { 'Content-Type': 'text/plain' }
      })
    ).to.equal(true);
  });

  it('_buildQueryString should build a query string correctly', () => {
    const result = (http as any)._buildQueryString({ a: 1, b: 'test' });
    expect(result).to.eq('?a=1&b=test');
  });

  it('_buildQueryString should return empty string', () => {
    const result = (http as any)._buildQueryString();
    expect(result).to.eq('');
  });
});
