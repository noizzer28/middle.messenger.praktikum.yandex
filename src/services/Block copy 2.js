// import EventBus from './EventBus';
// import Handlebars from 'handlebars';
import { v4 as MakeID } from 'uuid';

// class Block {
//   static EVENTS = {
//     INIT: 'init',
//     FLOW_CDM: 'flow:component-did-mount',
//     FLOW_CDU: 'flow:component-did-update',
//     FLOW_RENDER: 'flow:render'
//   };

//   _element;
//   _meta;
//   _props;
//   _events;
//   _lists;
//   _id;
//   _setUpdate = false;

//   constructor(tagName = 'div', propsAndChilds = {}) {
//     const { events, props, lists } = this.getChildren(propsAndChilds);
//     console.log('events and props constructor', events, props, lists);
//     const eventBus = new EventBus();
//     this._events = events;
//     console.log('props ID', this._id);

//     this._meta = {
//       tagName,
//       props
//     };
//     console.log('META', this._meta);

//     this._id = MakeID();
//     this._props = this._makePropsProxy({ ...props });
//     this._lists = this._makePropsProxy(lists);
//     console.log('this', this._props, this._lists);
//     this.eventBus = () => eventBus;

//     this._registerEvents(eventBus);
//     eventBus.emit(Block.EVENTS.INIT);
//   }

//   _registerEvents(eventBus) {
//     eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//   }

//   compile(template, props) {
//     console.log('COMPILE', template, props);
//     if (typeof props === 'undefined') {
//       props = this._props;
//     }
//     const propsAndStubs = { ...props };
//     console.log('COMPILE propsandstubs', propsAndStubs);
//     console.log('COMPILE props', this._props);

//     Object.entries(this._props).forEach(([key, child]) => {
//       console.log('Entries compile', key, child);
//       propsAndStubs[key] = `<div data-id="${key}"></div>`;
//     });
//     console.log('COMPILE props after', this._props, propsAndStubs);

//     // Object.entries(this._lists).forEach(([key, child]) => {
//     //   propsAndStubs[key] = `<div data-id="__${key}"></div>`;
//     // });

//     const fragment = this._createDocumentElement('template');
//     console.log('fragment', fragment);
//     fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
//     console.log(template, propsAndStubs);
//     console.log(Handlebars.compile(template)(propsAndStubs));

//     Object.entries(propsAndStubs).forEach(([key, child]) => {
//       console.log('Values compile', key, child);
//       const stub = fragment.content.querySelector(`[data-id="${key}"]`);
//       console.log(stub);
//       if (stub) {
//         stub.replaceWith(child.getContent());
//       }
//     });
//     // Object.values(this._lists).forEach(([key, child]) => {
//     //   const stub = fragment.content.querySelector(`[data-id="__${key}"]`);
//     //   if (!stub) {
//     //     return;
//     //   }

//     //   const listContent = this.createDocumentElement('template');

//     //   child.forEach((item) => {
//     //     if (item instanceof Block)
//     //       listContent.content.append(item.getContent());
//     //     else listContent.content.append(`${item}`);
//     //   });

//     //   stub.replaceWith(listContent.content);
//     // });
//     return fragment.content;
//   }
//   // compile(template, props) {
//   //   console.log('COMPILE', template, props);
//   //   if (typeof props === 'undefined') {
//   //     props = this._props;
//   //   }
//   //   const propsAndStubs = { ...props };
//   //   Object.entries(this._children).forEach(([key, child]) => {
//   //     propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
//   //   });
//   //   Object.entries(this._lists).forEach(([key, child]) => {
//   //     propsAndStubs[key] = `<div data-id="__${key}"></div>`;
//   //   });

//   //   const fragment = this._createDocumentElement('template');
//   //   fragment.innerHTML = Handlebars.compile(template)(propsAndStubs.items);
//   //   console.log(Handlebars.compile(template)(propsAndStubs.items));

//   //   // // console.log('fragment', fragment.content);

//   //   Object.values(this._children).forEach((child) => {
//   //     const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
//   //     if (stub) {
//   //       stub.replaceWith(child.getContent());
//   //     }
//   //   });
//   //   Object.values(this._lists).forEach(([key, child]) => {
//   //     const stub = fragment.content.querySelector(`[data-id="__${key}"]`);
//   //     if (!stub) {
//   //       return;
//   //     }

//   //     const listContent = this.createDocumentElement('template');

//   //     child.forEach((item) => {
//   //       if (item instanceof Block)
//   //         listContent.content.append(item.getContent());
//   //       else listContent.content.append(`${item}`);
//   //     });

//   //     stub.replaceWith(listContent.content);
//   //   });
//   //   return fragment.content;
//   // }
//   _makePropsProxy(props, id) {
//     return new Proxy(props, {
//       get(target, prop) {
//         const value = target[prop];
//         console.log('PROXY get', target, prop);
//         return typeof value === 'function'
//           ? value.bind(target)
//           : { value, id: MakeID() };
//       },
//       set(target, prop, value) {
//         console.log('PROXY set', target, prop, value);
//         if (target[prop] !== value) {
//           target.prop = value;
//           this._setUpdate = true;
//         }

//         return true;
//       },
//       deleteProperty() {
//         throw new Error('Нет доступа');
//       }
//     });
//   }
//   //INIT FLOW
//   init() {
//     this._createResources();
//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//   }

//   _createResources() {
//     const { tagName } = this._meta;
//     // console.log('tagname in create resources', tagName);
//     this._element = this._createDocumentElement(tagName);
//   }

//   _createDocumentElement(tagName) {
//     // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//     return document.createElement(tagName);
//   } //INIT FLOW END

//   getChildren(propsAndChilds) {
//     const events = {};
//     const props = {};
//     const lists = {};
//     // console.log('PROPS IN GETCHILDREn', propsAndChilds);
//     Object.keys(propsAndChilds).forEach((key) => {
//       if (key === 'events' && typeof propsAndChilds[key] === 'object') {
//         events[key] = propsAndChilds[key];
//       } else if (Array.isArray(propsAndChilds[key])) {
//         lists[key] = propsAndChilds[key];
//       } else {
//         props[key] = propsAndChilds[key];
//       }
//     });
//     console.log('GET CHILDREN', events, props, lists);
//     return { events, props, lists };
//   }

//   //FLOW RENDER
//   _render() {
//     const block = this.render();
//     console.log('_render block', block, this._element);
//     this._element.appendChild(block);
//   }
//   //   addEvents() {
//   //     const { events = {} } = this._props;
//   //     console.log('add events', events, this._props);
//   //     if (events) {
//   //       Object.keys(events).forEach((event) => {
//   //         this._element.addEventListener(event, events[event]);
//   //       });
//   //     }
//   //   }
//   render() {} //FLOW RENDER ENDS

//   //CDU FLOW
//   _componentDidUpdate(oldProps, newProps) {
//     const response = this.componentDidUpdate(oldProps, newProps);
//     console.log('CDU response', response);
//     if (!response) {
//       return;
//     }
//     this._render();
//   }

//   componentDidUpdate(oldProps, newProps) {
//     console.log('CDU', oldProps, newProps);
//     if (newProps === oldProps) {
//       return false;
//     } else {
//       return true;
//     }
//   } //CDU FLOW ENDS

//   setProps = (newProps) => {
//     // console.log('setprops');
//     // if (!nextProps) {
//     //   return;
//     // }

//     // Object.assign(this.props, nextProps);

//     if (!newProps) {
//       return;
//     }

//     this._setUpdate = false;
//     const oldValue = { ...this._props };

//     const { events, props, lists } = this.getChildren(newProps);

//     if (Object.values(events).length) {
//       Object.assign(this._events, events);
//     }

//     if (Object.values(props).length) {
//       Object.assign(this._props, props);
//     }

//     if (Object.values(lists).length) {
//       Object.assign(this._lists, lists);
//     }

//     if (this._setUpdate) {
//       this._eventBus.emit(Block.EVENT_FLOW_CDU, oldValue, this._props);
//       this._setUpdate = false;
//     }
//   };

//   getContent() {
//     console.log('getContent', this._element);
//     return this._element;
//   }

//   get element() {
//     console.log('get element', this._element);
//     return this._element;
//   }

//   show() {
//     console.log('show');
//     this.getContent().style.display = 'block';
//   }

//   hide() {
//     console.log('hide');
//     this.getContent().style.display = 'none';
//   }

//   _componentDidMount() {
//     console.log('_component did mount');
//     this.componentDidMount();
//   }

//   componentDidMount(oldProps) {}

//   dispatchComponentDidMount() {
//     console.log('dispatch CDM');
//     this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//   }
// }

// class Block {
//   static EVENTS = {
//     INIT: 'init',
//     FLOW_CDM: 'flow:component-did-mount',
//     FLOW_CDU: 'flow:component-did-update',
//     FLOW_RENDER: 'flow:render'
//   };

//   _element;
//   _meta;
//   _props;
//   _children;
//   _lists;
//   _id;
//   _setUpdate = false;

//   constructor(tagName = 'div', propsAndChilds = {}) {
//     const { children, props, lists } = this.getChildren(propsAndChilds);
//     console.log('children and props constructor', children, props, lists);
//     const eventBus = new EventBus();
//     this._children = children;
//     this._id = '123';
//     console.log('props constructor', this._element, this._meta);

//     this._meta = {
//       tagName,
//       props
//     };

//     this._props = this._makePropsProxy(props);
//     this._lists = this._makePropsProxy(lists);
//     this.eventBus = () => eventBus;

//     this._registerEvents(eventBus);
//     eventBus.emit(Block.EVENTS.INIT);
//   }

//   _registerEvents(eventBus) {
//     eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//   }

//   //INIT FLOW
//   init() {
//     this._createResources();
//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//   }

//   _createResources() {
//     const { tagName } = this._meta;
//     console.log('tagname in create resources', tagName);
//     this._element = this._createDocumentElement(tagName);
//   }

//   _createDocumentElement(tagName) {
//     // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//     return document.createElement(tagName);
//   } //INIT FLOW END

//   compile(template, props) {
//     console.log('COMPILE', template, props);
//     if (typeof props === 'undefined') {
//       props = this._props;
//     }
//     const propsAndStubs = { ...props };
//     Object.entries(this._children).forEach(([key, child]) => {
//       propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
//     });
//     Object.entries(this._lists).forEach(([key, child]) => {
//       propsAndStubs[key] = `<div data-id="__${key}"></div>`;
//     });

//     const fragment = this._createDocumentElement('template');
//     fragment.innerHTML = Handlebars.compile(template)(propsAndStubs.items);
//     console.log(Handlebars.compile(template)(propsAndStubs.items));

//     // // console.log('fragment', fragment.content);

//     Object.values(this._children).forEach((child) => {
//       const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
//       if (stub) {
//         stub.replaceWith(child.getContent());
//       }
//     });
//     Object.values(this._lists).forEach(([key, child]) => {
//       const stub = fragment.content.querySelector(`[data-id="__${key}"]`);
//       if (!stub) {
//         return;
//       }

//       const listContent = this.createDocumentElement('template');

//       child.forEach((item) => {
//         if (item instanceof Block)
//           listContent.content.append(item.getContent());
//         else listContent.content.append(`${item}`);
//       });

//       stub.replaceWith(listContent.content);
//     });
//     return fragment.content;
//   }
//   //FLOW RENDER
//   _render() {
//     const block = this.render();
//     console.log('_render block', block, this._element);
//     this._element.appendChild(block);
//   }
//   //   addEvents() {
//   //     const { events = {} } = this._props;
//   //     console.log('add events', events, this._props);
//   //     if (events) {
//   //       Object.keys(events).forEach((event) => {
//   //         this._element.addEventListener(event, events[event]);
//   //       });
//   //     }
//   //   }
//   render() {} //FLOW RENDER ENDS

//   //CDU FLOW
//   _componentDidUpdate(oldProps, newProps) {
//     const response = this.componentDidUpdate(oldProps, newProps);
//     console.log('CDU response', response);
//     if (!response) {
//       return;
//     }
//     this._render();
//   }

//   componentDidUpdate(oldProps, newProps) {
//     console.log('CDU', oldProps, newProps);
//     if (newProps === oldProps) {
//       return false;
//     } else {
//       return true;
//     }
//   } //CDU FLOW ENDS

//   setProps = (newProps) => {
//     // console.log('setprops');
//     // if (!nextProps) {
//     //   return;
//     // }

//     // Object.assign(this.props, nextProps);

//     if (!newProps) {
//       return;
//     }

//     this._setUpdate = false;
//     const oldValue = { ...this._props };

//     const { children, props } = this.getChildren(newProps);

//     if (Object.values(children).length) {
//       Object.assign(this._children, children);
//     }

//     if (Object.values(props).length) {
//       Object.assign(this._props, props);
//     }
//     if (this._setUpdate) {
//       this._eventBus.emit(Block.EVENT_FLOW_CDU, oldValue, this._props);
//       this._setUpdate = false;
//     }
//   };

//   getContent() {
//     console.log('getContent', this._element);
//     return this._element;
//   }

//   get element() {
//     console.log('get element', this._element);
//     return this._element;
//   }

//   getChildren(propsAndChilds) {
//     const children = {};
//     const props = {};
//     const lists = {};
//     Object.keys(propsAndChilds).forEach((key) => {
//       console.log('KEY', key);
//       if (propsAndChilds[key] instanceof Block) {
//         children[key] = propsAndChilds[key];
//       } else if (Array.isArray(propsAndChilds[key])) {
//         lists[key] = propsAndChilds[key];
//       } else {
//         props[key] = propsAndChilds[key];
//       }
//     });
//     console.log('GET CHILDREN', children, props, lists);
//     return { children, props, lists };
//   }

//   _makePropsProxy(props) {
//     return new Proxy(props, {
//       get(target, prop) {
//         const value = target[prop];
//         return typeof value === 'function' ? value.bind(target) : value;
//       },
//       set(target, prop, value) {
//         if (target[prop] !== value) {
//           target.prop = value;
//           this._setUpdate = true;
//         }

//         return true;
//       },
//       deleteProperty() {
//         throw new Error('Нет доступа');
//       }
//     });
//   }

//   show() {
//     console.log('show');
//     this.getContent().style.display = 'block';
//   }

//   hide() {
//     console.log('hide');
//     this.getContent().style.display = 'none';
//   }

//   _componentDidMount() {
//     console.log('_component did mount');
//     this.componentDidMount();
//   }

//   componentDidMount(oldProps) {}

//   dispatchComponentDidMount() {
//     console.log('dispatch CDM');
//     this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//   }
// }

// export default Block;

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
    console.log(
      'children and props constructor',
      children,
      props,
      lists,
      events
    );
    const eventBus = new EventBus();
    this._children = this._makePropsProxy(children);
    this._id = MakeID();

    this._meta = {
      tagName,
      props
    };

    this._children = this._makePropsProxy(props);
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

  // compile(template, props) {
  //   console.log('COMPILE', template, props);
  //   if (typeof props === 'undefined') {
  //     props = this._props;
  //   }
  //   const propsAndStubs = { ...props };
  //   Object.entries(this._children).forEach(([key, child]) => {
  //     propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
  //   });
  //   Object.entries(this._events).forEach(([key, child]) => {
  //     propsAndStubs[key] = `<div data-id="__${key}"></div>`;
  //   });

  //   const fragment = this._createDocumentElement('template');
  //   fragment.innerHTML = Handlebars.compile(template)(propsAndStubs.items);
  //   console.log(Handlebars.compile(template)(propsAndStubs.items));

  //   // // console.log('fragment', fragment.content);

  //   Object.values(this._children).forEach((child) => {
  //     const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
  //     if (stub) {
  //       stub.replaceWith(child.getContent());
  //     }
  //   });
  //   Object.values(this._events).forEach(([key, child]) => {
  //     const stub = fragment.content.querySelector(`[data-id="__${key}"]`);
  //     if (!stub) {
  //       return;
  //     }

  //     const listContent = this.createDocumentElement('template');

  //     child.forEach((item) => {
  //       if (item instanceof Block)
  //         listContent.content.append(item.getContent());
  //       else listContent.content.append(`${item}`);
  //     });

  //     stub.replaceWith(listContent.content);
  //   });
  //   return fragment.content;
  // }
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

    return { children, props, lists, events };
  }
  createDocumentElement(tag) {
    const element = document.createElement(tag);
    // element.setAttribute('data-id', this._id);
    console.log('CREATE DOC ELEMENT', element);
    return element;
  }

  compile(template, props) {
    if (typeof props === 'undefined') {
      props = this._props;
    }
    console.log(this._props);
    const propsAndStubs = { ...props };
    console.log('compile before', propsAndStubs);

    Object.entries(this._props).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="123"></div>`;
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._props).forEach((child) => {
      console.log('child', child);
      const stub = fragment.content.querySelector(`[data-id="123"]`);
      console.log(stub);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    // Object.values(this._lists).forEach(([key, child]) => {
    //   const stub = fragment.content.querySelector(`[data-id="__${key}"]`);
    //   if (!stub) {
    //     return;
    //   }
    //   const listContent = this.createDocumentElement('template');

    //   child.forEach((item) => {
    //     if (item instanceof Block)
    //       listContent.content.append(item.getContent());
    //     else listContent.content.append(`${item}`);
    //   });

    //   stub.replaceWith(listContent.content);
    // });
    return fragment.content;
  }
  // compile(template, props) {
  //   if (typeof props === 'undefined') {
  //     props = this._props;
  //   }
  //   console.log(this._props);
  //   const propsAndStubs = { ...props };
  //   console.log('compile before', propsAndStubs);

  //   Object.entries(this._children).forEach(([key, child]) => {
  //     console.log('CHILDREN', key, child);
  //     propsAndStubs[key] = `<div data-id="${key}"></div>`;
  //   });

  //   this._lists.items?.forEach((key, child) => {
  //     console.log('LISTS key', key);
  //     propsAndStubs[`items`] = key;
  //   });
  //   console.log('compile after', propsAndStubs);

  //   const fragment = this.createDocumentElement('template');
  //   fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
  //   console.log(template, propsAndStubs);
  //   console.log(Handlebars.compile(template)(propsAndStubs));

  //   console.log('fragment', fragment);

  //   Object.values(this._children).forEach((child) => {
  //     const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
  //     console.log(stub);
  //     if (stub) {
  //       stub.replaceWith(child.getContent());
  //     }
  //   });
  //   Object.values(this._lists).forEach(([key, child]) => {
  //     const stub = fragment.content.querySelector(`[data-id="__${key}"]`);
  //     if (!stub) {
  //       return;
  //     }
  //     console.log(propsAndStubs);
  //     const listContent = this.createDocumentElement('template');

  //     child.forEach((item) => {
  //       if (item instanceof Block)
  //         listContent.content.append(item.getContent());
  //       else listContent.content.append(`${item}`);
  //     });

  //     stub.replaceWith(listContent.content);
  //   });
  //   return fragment.content;
  // }
  //FLOW RENDER
  _render() {
    const block = this.render();
    console.log('_render block', block, this._element);
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addEvents();
  }
  addEvents() {
    const { events = {} } = this._props;
    console.log('add events', events, this._props);
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

  getContent() {
    console.log('getContent', this._element);
    return this._element;
  }

  get element() {
    console.log('get element', this._element);
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
