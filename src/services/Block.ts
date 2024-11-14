import { v4 as MakeID } from 'uuid';
import EventBus from './EventBus';
import Handlebars from 'handlebars';
import { TChildren, TEvents, TMeta, TProps, TLists } from '@/types';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private _element: HTMLElement | undefined;
  private _meta: TMeta;
  private _props: TProps;
  private _children: TChildren;
  private _events: TEvents;
  private _id: string;
  private _setUpdate: boolean;
  private _eventBus;
  private _lists: TLists;

  constructor(tagName = 'div', propsAndChilds = {}) {
    const { children, props, lists, events } = this.getChildren(propsAndChilds);
    // console.log('constructor', children, props, lists, events);
    this._eventBus = new EventBus();
    this._children = this._makePropsProxy(children) as TChildren;
    this._id = MakeID();

    this._meta = {
      tagName,
      props
    };
    this._events = events;
    this._lists = this._makePropsProxy(lists) as TLists;
    this._props = this._makePropsProxy({ ...props }) as TProps;
    // this._element = HTMLElement;
    this._setUpdate = false;
    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this._eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this.createDocumentElement(tagName);
  }

  getChildren(propsAndChilds: TProps) {
    const children: TChildren = {};
    const props: TProps = {};
    const lists: TLists = {};
    const events: TEvents = {};
    Object.keys(propsAndChilds).forEach((key) => {
      if (key === 'events' && typeof propsAndChilds[key] === 'object') {
        Object.assign(events, propsAndChilds[key] as TEvents);
      } else if (Array.isArray(propsAndChilds[key])) {
        lists[key] = propsAndChilds[key];
      } else if (propsAndChilds[key] instanceof Block) {
        children[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    });

    return { children, props, lists, events };
  }

  createDocumentElement(tag = 'div') {
    const element = document.createElement(tag);
    //element.setAttribute('data-id',this._id)
    return element;
  }

  compile(template: string, props?: TProps) {
    if (typeof props === 'undefined') {
      props = this._props;
    }
    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      // console.log('Key, CHILD', key, child);
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    Object.entries(this._lists).forEach(([key, listItem]) => {
      propsAndStubs[key] = listItem.map((listChild) => {
        return `<${listChild._meta.tagName} data-id="list-id-${listChild._id}"></${listChild._meta.tagName}>`;
      });
    });

    const fragment = this.createDocumentElement(
      'template'
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    // console.log('template in compile', fragment.innerHTML);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });
    Object.values(this._lists).forEach((list) => {
      list.forEach((listChild) => {
        const stub = fragment.content.querySelector(
          `[data-id="list-id-${listChild._id}"]`
        );
        if (stub) {
          stub.replaceWith(listChild.getContent() || '');
        }
      });
    });

    return fragment.content;
  }
  getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not initialized');
    }
    return this._element;
  }

  render() {}

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element!.innerHTML = '';
    this._element!.appendChild(block!);
    this.addAttribute();
    this.addEvents();
  }
  addAttribute() {
    const { attr = {} } = this._props as TProps;
    Object.entries(attr).forEach(([key, value]) => {
      this._element!.setAttribute(key, value);
    });
  }
  // addEvents() {
  //   const events = this._events as TProps;
  //   console.log('add events', events, this._events);
  //   if (events) {
  //     Object.keys(events).forEach((event: string) => {
  //       const handler = events[event as keyof TEvents];
  //       if (handler) {
  //         this._element!.addEventListener(event, handler);
  //       }
  //       // this._element!.addEventListener(event, handler);
  //     });
  //   }
  // }
  addEvents() {
    const events = this._events as TEvents;
    console.log('add events', events);
    if (events) {
      Object.keys(events).forEach((event: string) => {
        const handler = events[event as keyof TEvents];
        if (handler) {
          this._element!.addEventListener(event, handler);
        }
      });
    }
  }

  removeEvents() {
    const { events } = this._events as TProps;
    if (events) {
      Object.keys(events).forEach((event: string) => {
        const handler = events[event as keyof TEvents];
        if (handler) {
          this._element!.removeEventListener(event, handler);
        }
      });
    }
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    console.log('_CDU', oldProps, newProps);
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (newProps === oldProps) {
      return false;
    } else {
      return true;
    }
  }

  setProps = (newProps: TProps) => {
    if (!newProps) {
      return;
    }
    console.log('newprops', newProps);
    this._setUpdate = false;

    const oldValue = { ...this._props };
    console.log('oldvalue', oldValue);
    const { children, props, lists } = this.getChildren(newProps);
    console.log('ch, pr, li', children, props, lists);
    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }
    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
    }
    console.log('value after', children, props, lists);
    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  _makePropsProxy(props: TChildren | TLists | TProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        // console.log('setproxy', target, prop, value);
        // console.log('setproxy', target[prop], value);
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
        }

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }
}

export default Block;
