import EventBus from './EventBus';
import { TStore } from '../types';

export enum StoreEvents {
  Updated = 'Updated'
}

class Store extends EventBus {
  private static __instance: Store;
  private state: TStore = { user: null };
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
    console.log(this.state);

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
export default new Store();
