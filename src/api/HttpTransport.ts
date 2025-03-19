import { METHODS, HTTPMethod, RequestOptions } from '../types';

export class HTTPTransport {
  private readonly baseUrl: string;
  // private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = 'https://ya-praktikum.tech/api/v2/';
    // this.defaultHeaders = {
    //   'Content-Type': 'application/json'
    // };
  }

  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { method: METHODS.GET }, options.timeout);

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
    // console.log('options in HTTPTRANSPORT', options);
    const queryString = this._buildQueryString(query);
    const fullUrl = `${this.baseUrl}${url}${queryString}`;
    // const finalHeaders = { ...this.defaultHeaders, ...headers };

    return new Promise<R>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, fullUrl);
      xhr.timeout = timeout;
      xhr.withCredentials = true;
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      // xhr.onload = () => {
      //   let response;
      //   if (xhr.responseText === 'OK') {
      //     resolve(xhr.responseText as R);
      //   } else {
      //     response = JSON.parse(xhr.responseText);
      //   }

      //   if (xhr.status >= 200 && xhr.status < 300) {
      //     resolve(response as R);
      //   } else {
      //     reject(new Error(`Ошибка: ${xhr.status} ${response.reason}`));
      //   }
      // };
      xhr.onload = () => {
        let response;
        try {
          response =
            xhr.responseText === 'OK'
              ? xhr.responseText
              : JSON.parse(xhr.responseText);
        } catch (error) {
          if (error instanceof Error) {
            reject(new Error('Ошибка разбора ответа: ' + error.message));
            return;
          }
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(response as R);
        } else {
          reject(
            new Error(
              `Ошибка: ${xhr.status} ${response?.reason || 'Неизвестная ошибка'}`
            )
          );
        }
      };

      xhr.onerror = () => reject(new Error('Ошибка сети'));
      xhr.ontimeout = () =>
        reject(new Error('Превышено время ожидания запроса'));

      if (method === METHODS.GET || !body) {
        xhr.send();
      } else if (body instanceof FormData) {
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(body);
        // console.log(xhr.send(body));
      } else {
        xhr.setRequestHeader('Content-Type', 'application/Json');
        xhr.send(JSON.stringify(body));
      }
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
