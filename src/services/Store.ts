import EventBus from './EventBus';
import { TStore } from '../types';

export enum StoreEvents {
  Updated = 'Updated'
}
type Indexed<T = unknown> = {
  [key in string]: T;
};
class Store extends EventBus {
  private static __instance: Store;
  private state: TStore = {
    user: null,
    error: {
      authError: null,
      regError: null
    },
    chatList: [],
    activeChat: null,
    activeMessages: []
  };
  private initialState: TStore = { ...this.state };
  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();
    Store.__instance = this;
  }
  public getState() {
    return this.state;
  }
  public set(nextState: object) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
    console.log('setting state', this.state);

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
  public reset() {
    const prevState = { ...this.state };
    this.state = { ...this.initialState };
    this.emit(StoreEvents.Updated, prevState, this.state);
    console.log('State has been reset:', this.state);
  }
}
export default new Store();
