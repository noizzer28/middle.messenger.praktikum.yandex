import './styles/null.scss';
import './styles/style.scss';
import Handlebars from 'handlebars';
import * as Components from './components/components.js';
import * as Pages from './pages/pages';

const pages = {
  login: [Pages.LoginPage],
  registration: [Pages.RegPage],
  profile: [Pages.Profile],
  chat: [Pages.Chat],
  notfound: [Pages.NotFoundPage],
  error: [Pages.ErrorPage]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

const navigate = (page) => {
  console.log(page);
  const [src, args] = pages[page];
  const handlebarsFunc = Handlebars.compile(src);
  document.getElementById('app').innerHTML = handlebarsFunc(args);
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

    // default: {
    //   window.location.pathname = '/login';
    // }
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
