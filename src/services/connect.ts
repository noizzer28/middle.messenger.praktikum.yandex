import Block from './Block';
import { TProps, TStore } from '../types';
import store, { StoreEvents } from './Store';
import isEqual from '../utils/isEqual';

export function connect(
  Component: typeof Block,
  mapStateToProps: (state: TStore) => TProps
) {
  return class extends Component {
    // private onChangeStore: () => void;
    constructor(tag: string, props: TProps) {
      const mappedProps = mapStateToProps(store.getState());
      super(tag, { ...props, ...mappedProps });

      store.on(StoreEvents.Updated, () => {
        const newMappedProps = mapStateToProps(store.getState());

        if (!isEqual(mappedProps, newMappedProps)) {
          this.setProps({ ...newMappedProps });
        }
      });
    }
  };
}
