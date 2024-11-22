class HTTPTransport {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get(
    url: string,
    query: Record<string, string> = {},
    retries = 3
  ): Promise<unknown> {
    const queryString = this._buildQueryString(query);
    return this._request(
      `${this.baseUrl}${url}${queryString}`,
      'GET',
      null,
      retries
    );
  }

  post(
    url: string,
    body: Record<string, unknown> = {},
    retries = 3
  ): Promise<unknown> {
    return this._request(`${this.baseUrl}${url}`, 'POST', body, retries);
  }

  put(
    url: string,
    body: Record<string, unknown> = {},
    retries = 3
  ): Promise<unknown> {
    return this._request(`${this.baseUrl}${url}`, 'PUT', body, retries);
  }

  delete(
    url: string,
    body: Record<string, unknown> = {},
    retries = 3
  ): Promise<unknown> {
    return this._request(`${this.baseUrl}${url}`, 'DELETE', body, retries);
  }

  private _request(
    url: string,
    method: string,
    body: Record<string, unknown> | null,
    retries: number
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const attempt = (retryCount: number) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        if (method !== 'GET' && body) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else if (retryCount === 1) {
            reject(new Error(`Ошибка: ${xhr.status} ${xhr.statusText}`));
          } else {
            console.log(
              `Попытка ${retries - retryCount + 1} не удалась. Повтор...`
            );
            attempt(retryCount - 1);
          }
        };

        xhr.onerror = () => {
          if (retryCount === 1) {
            reject(new Error('Ошибка сети'));
          } else {
            console.log(
              `Попытка ${retries - retryCount + 1} не удалась. Повтор...`
            );
            attempt(retryCount - 1);
          }
        };

        xhr.send(body ? JSON.stringify(body) : null);
      };

      attempt(retries);
    });
  }

  private _buildQueryString(query: Record<string, string>): string {
    const keys = Object.keys(query);
    if (!keys.length) return '';
    return `?${keys.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&')}`;
  }
}

export default HTTPTransport;
