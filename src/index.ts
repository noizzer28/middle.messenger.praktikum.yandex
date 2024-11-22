import './styles/null.scss';
import './styles/style.scss';
import Block from './services/Block.ts';
import * as Pages from './pages/pages.ts';
import { renderDOM } from './utils/render.js';
import { PageKeys } from './types.ts';

const pages: Record<PageKeys, Block | undefined> = {
  login: Pages.loginPage,
  registration: Pages.registerPage,
  profile: Pages.profilePage,
  chat: Pages.chatPage,
  notfound: Pages.notFoundPage,
  error: Pages.errorPage
};

const navigate = (page: PageKeys) => {
  const targetPage = pages[page];
  if (targetPage) {
    renderDOM(targetPage);
  } else {
    console.error(`Page ${page} does not exist`);
  }
};

document.addEventListener('DOMContentLoaded', (e: Event) => {
  const path = (e.target as Document).location.pathname;

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

  document.addEventListener('click', (e: MouseEvent) => {
    const page = (e.target as HTMLElement).getAttribute('page') as PageKeys;
    if (page) {
      navigate(page);

      e.preventDefault();
      e.stopImmediatePropagation();
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
