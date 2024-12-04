import template from './template';
import Block from '../../services/Block';
import { router } from '../../index';
import { TProps } from '@/types';

class ErrorPage extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, propsAndChilds);
    this.addErrorEvents();
  }
  render() {
    return this.compile(template);
  }
  addErrorEvents() {
    document.addEventListener('DOMContentLoaded', () => {
      const btnBack = document.getElementById('btn-error__back');
      if (btnBack) {
        btnBack.addEventListener('click', (e) => {
          console.log(e);
          router.back();
        });
      }
    });
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
