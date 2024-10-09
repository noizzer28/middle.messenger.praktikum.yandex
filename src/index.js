import './styles/null.scss';
import './styles/style.scss';
import Handlebars from 'handlebars';
import * as Components from './components/components.js';
import * as Pages from './pages/pages';

const pages = {
  'login-page': [Pages.LoginPage],
  'registration-page': [Pages.RegPage]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

const navigate = (page) => {
  console.log(pages, page);
  const [src, args] = pages[page];
  const handlebarsFunc = Handlebars.compile(src);
  document.getElementById('app').innerHTML = handlebarsFunc(args);
};

document.addEventListener('DOMContentLoaded', (e) => {
  const path = e.target.location.pathname;

  switch (path) {
    case '/login': {
      navigate('login-page');
      break;
    }
    case '/register': {
      navigate('registration-page');
      break;
    }
    // case '/profile': {
    //   navigate('profilePage');
    //   break;
    // }
    // case '/edit-profile': {
    //   navigate('editProfilePage');
    //   break;
    // }
    // case '/edit-password': {
    //   navigate('editPasswordPage');
    //   break;
    // }
    // case '/404': {
    //   navigate('notFoundPage');
    //   break;
    // }
    // case '/500': {
    //   navigate('errorPage');
    //   break;
    // }
    case '/': {
      document.getElementById('app').innerHTML = `
      <div class="flex-column mt-30">
        <h1 class="headers-text" >Добро пожаловать в Yandex Talk</h1>
        <div>
        Выберите страницу для перехода:
        </div>
        <a href='#' page="login-page">Авторизация</a>
        <a href='#' page="registration-page">Регистрация</a>

      </div>
    `;
      break;
    }

    default: {
      window.location.pathname = '/login';
    }
  }

  document.addEventListener('click', (event) => {
    const page = event.target.getAttribute('page');
    console.log(page, event, event.target);
    if (page) {
      navigate(page);

      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
});
