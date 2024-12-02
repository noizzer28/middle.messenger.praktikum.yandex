import { METHODS, HTTPMethod, RequestOptions } from '@/types';

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  private request<R>(
    url: string,
    options: RequestOptions,
    timeout: number = 5000
  ): Promise<R> {
    const { method = METHODS.GET, headers = {}, body, query } = options;

    const queryString = this._buildQueryString(query);
    const fullUrl = `${this.baseUrl}${url}${queryString}`;

    return new Promise<R>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, fullUrl);
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText) as R);
        } else {
          reject(new Error(`Ошибка: ${xhr.status} ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error('Ошибка сети'));
      xhr.ontimeout = () =>
        reject(new Error('Превышено время ожидания запроса'));

      xhr.send(body ? JSON.stringify(body) : null);
    });
  }

  private _buildQueryString(query?: Record<string, string>): string {
    if (!query) return '';
    return `?${Object.entries(query)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')}`;
  }
}

export default HTTPTransport;
