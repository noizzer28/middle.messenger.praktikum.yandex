import { TCallback, TEventsInner } from '../types';

export default class EventBus {
  private listeners: TEventsInner;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: TCallback): void {
    // console.log('eb on', event, callback);
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: TCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]): void {
    // console.log('emit', event, args);
    // console.log(this.listeners);
    if (!this.listeners[event]) {
      // throw new Error(`Нет события: ${event}`);
      console.log('No event yet');
      return;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
