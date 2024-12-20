import Block from './Block';
import { TProps, TStore, Indexed } from '../types';
import store, { StoreEvents } from './Store';
import isEqual from '../utils/isEqual';

// export function connect<P>(
//   Component: typeof Block,
//   mapStateToProps: (state: TStore) => P
// ) {
//   return class extends Component {
//     constructor(props) {
//       super({ ...props, ...mapStateToProps(store.getState()) });
//       store.on(StoreEvents.Updated, () => {
//         this.setProps({ ...mapStateToProps(store.getState()) });
//       });
//     }
//   };
// }

export function connect(mapStateToProps) {
  return function (Component: typeof Block) {
    return class extends Component {
      private onChangeStoreCallback: () => void;
      constructor(tag: string, props: object) {
        let state = mapStateToProps(store.getState());
        // console.log('maptpprops', mapStateToProps, store.getState());
        // console.log('connect', state, props);
        // super({ ...props, ...state });
        super(tag, props);
        console.log('connect super', props, state);
        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        };
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
