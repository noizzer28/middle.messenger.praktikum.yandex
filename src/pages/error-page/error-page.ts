import template from './template';
import Block from '../../services/Block';

class ErrorPage extends Block {
  render() {
    return this.compile(template);
  }
}

export const errorPage = new ErrorPage('div', {
  attr: {
    class: 'container'
  },
  text: `Произошла ошибка на сервере...`,
  img: '/error.png'
});

export const notFoundPage = new ErrorPage('div', {
  attr: {
    class: 'container'
  },
  text: 'Такой страницы не существует...',
  img: '/404.png'
});
