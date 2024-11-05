import './styles/null.scss';
import './styles/style.scss';

import * as Pages from './pages/pages';
import { renderDOM } from './utils/render.js';

const pages = {
  login: Pages.loginPage,
  registration: Pages.RegPage,
  profile: Pages.profilePage,
  chat: Pages.Chat,
  notfound: Pages.NotFoundPage,
  error: Pages.ErrorPage
};

const navigate = (page) => {
  renderDOM(pages[page]);
};

document.addEventListener('DOMContentLoaded', (e) => {
  const path = e.target.location.pathname;

  switch (path) {
    case '/login': {
      navigate('login');
      break;
    }
    case '/register': {
      navigate('registration');
      break;
    }
    case '/profile': {
      navigate('profile');
      break;
    }
    case '/chat': {
      navigate('chat');
      break;
    }
    case '/404': {
      navigate('notfound');
      break;
    }
    case '/500': {
      navigate('error');
      break;
    }
    // case '/': {
    //   document.getElementById('app').innerHTML = `
    //   <div class="flex-column mt-30">
    //     <h1 class="headers-text" >Добро пожаловать в Yandex Talk</h1>
    //     <div>
    //     Выберите страницу для перехода:
    //     </div>
    //     <a href='#' page="login-page">Авторизация</a>
    //     <a href='#' page="registration-page">Регистрация</a>

    //   </div>
    // `;
    //   break;
    // }

    default: {
      window.location.pathname = '/login';
    }
  }

  document.addEventListener('click', (event) => {
    const page = event.target.getAttribute('page');
    if (page) {
      navigate(page);

      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
});

// import Block from './services/Block.js';
// class Button extends Block {
//   constructor(props) {
//     super('button', props);
//   }

//   render() {
//     console.log('render in index.js');
//     return `<div>${this.props.text}</div>`;
//   }
// }

// function render(query, block) {
//   console.log('function render');
//   // console.log(query, block);
//   const root = document.getElementById(query);
//   // console.log(root);
//   root.appendChild(block.getContent());
//   return root;
// }

// const button = new Button({
//   text: 'Click me'
// });

// // app — это class дива в корне DOM
// render('app', button);

// // Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//   console.log('обновление props settimeout');
//   button.setProps({
//     text: 'Click me, please'
//   });
// }, 2000);
