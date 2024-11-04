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
  _events;
  _lists;
  _id;
  _setUpdate = false;

  constructor(tagName = 'div', propsAndChilds = {}) {
    const { events, props, lists } = this.getChildren(propsAndChilds);
    console.log('events and props constructor', events, props, lists);
    const eventBus = new EventBus();
    this._events = events;
    this._id = '123';
    console.log('props constructor', this._element, this._meta);

    this._meta = {
      tagName,
      props
    };

    this._props = this._makePropsProxy(props);
    this._lists = this._makePropsProxy(lists);
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

  //INIT FLOW
  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    const { tagName } = this._meta;
    console.log('tagname in create resources', tagName);
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  } //INIT FLOW END

  compile(template, props) {
    console.log('COMPILE', template, props);
    if (typeof props === 'undefined') {
      props = this._props;
    }
    const propsAndStubs = { ...props };
    Object.entries(this._events).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    Object.entries(this._lists).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="__${key}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs.items);
    console.log(Handlebars.compile(template)(propsAndStubs.items));

    // // console.log('fragment', fragment.content);

    Object.values(this._events).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });
    Object.values(this._lists).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="__${key}"]`);
      if (!stub) {
        return;
      }

      const listContent = this.createDocumentElement('template');

      child.forEach((item) => {
        if (item instanceof Block)
          listContent.content.append(item.getContent());
        else listContent.content.append(`${item}`);
      });

      stub.replaceWith(listContent.content);
    });
    return fragment.content;
  }
  //FLOW RENDER
  _render() {
    const block = this.render();
    console.log('_render block', block, this._element);
    this._element.appendChild(block);
  }
  //   addEvents() {
  //     const { events = {} } = this._props;
  //     console.log('add events', events, this._props);
  //     if (events) {
  //       Object.keys(events).forEach((event) => {
  //         this._element.addEventListener(event, events[event]);
  //       });
  //     }
  //   }
  render() {} //FLOW RENDER ENDS

  //CDU FLOW
  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    console.log('CDU response', response);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps, newProps) {
    console.log('CDU', oldProps, newProps);
    if (newProps === oldProps) {
      return false;
    } else {
      return true;
    }
  } //CDU FLOW ENDS

  setProps = (newProps) => {
    // console.log('setprops');
    // if (!nextProps) {
    //   return;
    // }

    // Object.assign(this.props, nextProps);

    if (!newProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this._props };

    const { events, props } = this.getChildren(newProps);

    if (Object.values(events).length) {
      Object.assign(this._events, events);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }
    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENT_FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  };

  getContent() {
    console.log('getContent', this._element);
    return this._element;
  }

  get element() {
    console.log('get element', this._element);
    return this._element;
  }

  getChildren(propsAndChilds) {
    const events = {};
    const props = {};
    const lists = {};
    Object.keys(propsAndChilds).forEach((key) => {
      console.log('KEY', key);
      if (typeof propsAndChilds[key] === 'function') {
        events[key] = propsAndChilds[key];
      } else if (Array.isArray(propsAndChilds[key])) {
        lists[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    });
    console.log('GET CHILDREN', events, props, lists);
    return { events, props, lists };
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
    console.log('show');
    this.getContent().style.display = 'block';
  }

  hide() {
    console.log('hide');
    this.getContent().style.display = 'none';
  }

  _componentDidMount() {
    console.log('_component did mount');
    this.componentDidMount();
  }

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    console.log('dispatch CDM');
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
}

export default Block;
