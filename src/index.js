import './styles/null.scss';
import './styles/style.scss';
import Handlebars from 'handlebars';
import * as Components from './components/components.js';
import * as Pages from './pages/pages';

const pages = {
  'login-page': [Pages.LoginPage]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

const navigate = (page) => {
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
    // case '/register': {
    //   navigate('registrationPage');
    //   break;
    // }
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
    //     case '/': {
    //       document.getElementById('app').innerHTML = `
    //   <div>

    //     <h1>Добро пожаловать в Yandex Talk</h1>
    //     <div>
    //     Выберите страницу для перехода
    //     </div>

    //   </div>
    // `;
    //       break;
    //     }

    default: {
      window.location.pathname = '/login';
    }
  }
});
