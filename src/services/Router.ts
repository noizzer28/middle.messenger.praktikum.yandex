import Block from './Block';
import { notFoundPage } from '../pages/pages';
import { render } from '../utils/render';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
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

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;

    Router.__instance = this;
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
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    // console.log('onroute', pathname, route);
    if (!route) {
      const route = new Route('/400', notFoundPage, { rootQuery: '.app' });
      route.render();
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
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
