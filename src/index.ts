import './styles/null.scss';
import './styles/style.scss';
import Block from './services/Block.ts';
import * as Pages from './pages/pages.ts';
import Router from './services/Router.ts';
import { ROUTES, PageKeys } from './types.ts';
import { LoginUser } from './utils/useLogin.ts';

const pages: Record<PageKeys, Block | undefined> = {
  login: Pages.loginPage,
  registration: Pages.registerPage,
  profile: Pages.profilePage,
  chat: Pages.chatPage,
  notfound: Pages.notFoundPage,
  error: Pages.errorPage
};

let router: Router;
(async function initApp() {
  try {
    router = new Router('.app');
    await LoginUser();

    router
      .use(ROUTES.LOGIN, pages.login)
      .use(ROUTES.REGISTER, pages.registration)
      .use(ROUTES.SETTINGS, pages.profile)
      .use(ROUTES.CHAT, pages.chat)
      .use(ROUTES.ERROR, pages.error)
      .start();

    window.addEventListener('popstate', () => {
      console.log('onpopstate');
      router.init();
      router.start();
    });

    document.addEventListener('click', (e: MouseEvent) => {
      const page = (e.target as HTMLElement).getAttribute('page') as PageKeys;
      if (page) {
        router.go(page);
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);
    const errorRouter = new Router('.app');
    errorRouter.use(ROUTES.ERROR, pages.error).start();
  }
})();
export { router };
