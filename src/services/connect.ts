import Block from './Block';
import { TProps, TStore, Indexed } from '../types';
import store, { StoreEvents } from './Store';
import isEqual from '../utils/isEqual';

// type MapStateToProps<TState, TProps> = (state: TState) => TProps;

export function connect(
  Component: typeof Block,
  mapStateToProps: (state: TStore) => TProps
) {
  return class extends Component {
    constructor(tag: string, props: Record<string, unknown> = {}) {
      const mappedProps = mapStateToProps(store.getState());
      super(tag, { ...props, ...mappedProps });

      store.on(StoreEvents.Updated, () => {
        const newMappedProps = mapStateToProps(store.getState());
        this.setProps({ ...newMappedProps });
      });
    }
  };
}

// export function connect(mapStateToProps) {
//   return function (Component: typeof Block) {
//     return class extends Component {
//       private onChangeStoreCallback: () => void;
//       constructor(tag: string, props: object) {
//         let state = mapStateToProps(store.getState());
//         // console.log('maptpprops', mapStateToProps, store.getState());
//         console.log('connect', state, props);
//         // super({ ...props, ...state });
//         super(tag, props);
//         console.log('connect super', props, state);
//         this.onChangeStoreCallback = () => {
//           const newState = mapStateToProps(store.getState());
//           if (!isEqual(state, newState)) {
//             this.setProps({ ...newState });
//           }
//           state = newState;
//         };
//         store.on(StoreEvents.Updated, this.onChangeStoreCallback);
//       }
//     };
//   };
// }
