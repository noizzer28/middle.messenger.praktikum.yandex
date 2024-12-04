import './styles/null.scss';
import './styles/style.scss';
import Block from './services/Block.ts';
import * as Pages from './pages/pages.ts';
import Router from './services/Router.ts';
import { PageKeys } from './types.ts';

const pages: Record<PageKeys, Block | undefined> = {
  login: Pages.loginPage,
  registration: Pages.registerPage,
  profile: Pages.profilePage,
  chat: Pages.chatPage,
  notfound: Pages.notFoundPage,
  error: Pages.errorPage
};

export const router = new Router('.app');

router
  .use('/', pages.login)
  .use('/sign-up', pages.registration)
  .use('/settings', pages.profile)
  .use('/messenger', pages.chat)
  .use('/500', pages.error)
  .start();

document.addEventListener('click', (e: MouseEvent) => {
  const page = (e.target as HTMLElement).getAttribute('page') as PageKeys;
  if (page) {
    router.go(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
