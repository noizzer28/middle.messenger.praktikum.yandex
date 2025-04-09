import Block from './Block';
import { notFoundPage } from '../pages/pages';
import { render } from '../utils/render';
import { ROUTES } from '../types';
import { LoginUser } from '../utils/useLogin';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function isAllowedForGuest(pathname: string): boolean {
  if (pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER) {
    return true;
  }
  return false;
}

type RProps = {
  rootQuery: string;
};
class Route {
  private _pathname: string;
  private _block: Block;
  private _props: RProps;

  constructor(pathname: string, block: Block, props: RProps) {
    this._pathname = pathname;
    this._block = block;
    this._props = props;
  }

  navigate(pathname: string) {
    console.log('router navigate', pathname);
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (this._block) {
      render(this._props.rootQuery, this._block);
      this._block.show();
      return;
    }
  }
}

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = '';
  private _isLogged: boolean = false;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public async init() {
    await LoginUser();
  }

  public isLoggedIn(state: boolean) {
    this._isLogged = state;
  }

  use(pathname: string, block: Block | undefined): this {
    if (!block) {
      block = notFoundPage;
    }
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    // console.log('router start', window.location.pathname);
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    // console.log('onroute', pathname, route, this._isLogged);
    if (!route) {
      const route = new Route('/400', notFoundPage, { rootQuery: '.app' });
      route.render();
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    if (!this._isLogged && !isAllowedForGuest(pathname)) {
      this.go(ROUTES.LOGIN);
      return;
    }
    if (this._isLogged && isAllowedForGuest(pathname)) {
      this.go(ROUTES.CHAT);
      return;
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
