import Block from './Block';
import { TProps, TStore, Indexed } from '../types';
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
        // console.log(
        //   !isEqual(mappedProps, newMappedProps),
        //   mappedProps,
        //   newMappedProps
        // );
        if (!isEqual(mappedProps, newMappedProps)) {
          this.setProps({ ...newMappedProps });
        }
        // this.setProps({ ...newMappedProps });
      });
      // this.onChangeStore = () => {
      //   const newMappedProps = mapStateToProps(store.getState());
      //   if (!isEqual(mappedProps, newMappedProps)) {
      //     this.setProps({ ...newMappedProps });
      //   }
      // };
      // store.on(StoreEvents.Updated, this.onChangeStore);
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
