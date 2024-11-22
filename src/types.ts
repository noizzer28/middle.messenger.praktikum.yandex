import Block from './services/Block';

// export enum Events {
//   CLICK = 'click',
//   BLUR = 'blur',
//   FOCUS = 'focus'
// }

// export type TEvents = Record<string, TCallback>;

export type TEventsInner = {
  [event: string]: TCallback[];
};

export type TEvents = {
  [K in EventKeys]?: EventHandler<K>;
};

export type EventKeys = keyof HTMLElementEventMap;

export type EventsMap = {
  [K in EventKeys]: HTMLElementEventMap[K];
};

// type EventHandler<K extends EventKeys> = K extends keyof EventsMap
//   ? (event: EventsMap[K]) => void
//   : never;
type EventHandler<K extends EventKeys> = (event: EventsMap[K]) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCallback = (...args: any[]) => void;
export type TCallbackEmpty = () => void;

// export type TPageValues = keyof Record<EPages, string>;

export enum Event {
  INIT = 'init',
  MOUNTED = 'mounted',
  UPDATED = 'updated',
  RENDER = 'render'
}

export type TProps = {
  [key: string]: unknown | TLists;
  settings?: {
    withInternalId?: boolean;
  };
  attr?: object;
  events?: TEvents;
};

export type TIterableObject = {
  [index: string]: unknown;
};

export type TChildren = Record<string, Block>;

export type TMeta = {
  tagName: string;
  props: TProps;
};

export type TLists = Record<string, Block[]>;
// export type TLists = { [id: string]: Block };

export type PageKeys =
  | 'login'
  | 'profile'
  | 'registration'
  | 'chat'
  | 'notfound'
  | 'error';
