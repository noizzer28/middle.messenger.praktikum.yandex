import { v4 as MakeID } from 'uuid';
import EventBus from './EventBus';
import Handlebars from 'handlebars';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  _element;
  _meta;
  _props;
  _children;
  _events;
  _id;
  _setUpdate = false;

  constructor(tagName = 'div', propsAndChilds = {}) {
    const { children, props, lists, events } = this.getChildren(propsAndChilds);
    console.log('constructor', children, props, lists, events);
    const eventBus = new EventBus();
    this._children = this._makePropsProxy(children);
    this._id = MakeID();

    this._meta = {
      tagName,
      props
    };
    this._events = events;
    this._lists = this._makePropsProxy(lists);
    this._props = this._makePropsProxy({ ...props });
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this.createDocumentElement(tagName);
  }

  getChildren(propsAndChilds) {
    const children = {};
    const props = {};
    const lists = {};
    const events = {};
    Object.keys(propsAndChilds).forEach((key) => {
      if (key === 'events' && typeof propsAndChilds[key] === 'object') {
        events[key] = propsAndChilds[key];
      } else if (Array.isArray(propsAndChilds[key])) {
        lists[key] = propsAndChilds[key];
      } else if (propsAndChilds[key] instanceof Block) {
        children[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    });

    // Object.keys(propsWithChilds).forEach((key) => {
    //   if (propsWithChilds[key] instanceof Block) {
    //     children[key] = propsWithChilds[key];
    //   } else if (
    //     Array.isArray(propsWithChilds[key]) &&
    //     propsWithChilds[key].every((child) => child instanceof Block)
    //   ) {
    //     lists[key] = propsWithChilds[key];
    //   } else {
    //     props[key] = propsWithChilds[key];
    //   }
    // });

    return { children, props, lists, events };
  }

  // @ansnekit-ts зачем этот метод если он нигде не используется? Должен по идее в ф-ции init() использоваться
  createDocumentElement(tag) {
    const element = document.createElement(tag);
    // @ansnekit-ts тут мы создаем главный элемент родитель. Ему можно установить id element.setAttribute('data-id',this._id)
    return element;
  }

  compile(template, props) {
    console.log('TEMPLATE', template);
    if (typeof props === 'undefined') {
      props = this._props;
    }
    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    Object.entries(this._lists).forEach(([key, listItem]) => {
      propsAndStubs[key] = listItem.map((listChild) => {
        return `<div data-id="list-id-${listChild._id}"></div>`;
      });
    });

    const fragment = this.createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    console.log('FRAGMENt', fragment.innerHTML);

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
  getContent() {
    return this._element;
  }
  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addAttribute();
    this.addEvents();
  }
  addAttribute() {
    const { attr = {} } = this._props;
    console.log('attri', attr);
    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }
  addEvents() {
    const { events } = this._events;
    if (events) {
      Object.keys(events).forEach((event) => {
        this._element.addEventListener(event, events[event]);
      });
    }
  }

  removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }
  render() {}

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps, newProps) {
    if (newProps === oldProps) {
      return false;
    } else {
      return true;
    }
  }

  setProps = (newProps) => {
    if (!newProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this._props };

    const { children, props } = this.getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }
    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENT_FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  _makePropsProxy(props) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          target.prop = value;
          this._setUpdate = true;
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

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
}

export default Block;
