import Block from './services/Block';

// export enum Events {
//   CLICK = 'click',
//   BLUR = 'blur',
//   FOCUS = 'focus'
// }

// export type TEvents = Record<string, TCallback>;
export type Indexed<T = unknown> = {
  [key: string]: T;
};
export interface UserInterface {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  avatar: string;
  phone: string;
}

export type TStore = {
  user: UserInterface | null;
  [key: string]: unknown;
};

export type HTTPMethod = <R = unknown>(
  url: string,
  options?: RequestOptions
) => Promise<R>;

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
export enum ROUTES {
  SETTINGS = '/settings',
  LOGIN = '/',
  REGISTER = '/sign-up',
  ERROR = '/500',
  CHAT = '/messenger'
}
export type PageKeys =
  | 'login'
  | 'profile'
  | 'registration'
  | 'chat'
  | 'notfound'
  | 'error';

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, string>;
  method?: METHODS;
  timeout?: number;
}
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

type EventHandler<K extends EventKeys> = (event: EventsMap[K]) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCallback = (...args: any[]) => void;
export type TCallbackEmpty = () => void;

export enum Event {
  INIT = 'init',
  MOUNTED = 'mounted',
  UPDATED = 'updated',
  RENDER = 'render'
}

export type TProps = {
  [key: string]: unknown | TLists;
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
